// @ts-ignore
import { tmpl } from "riot-tmpl";
import { newEffect } from "./reactivity";

/**
 * Reactive dom attribute
 */
interface HTMLElementWithData extends HTMLElement {
  data?: string;
}

function getMountElementName() {
  const pathname = window.location.pathname;
  return pathname.replace("/", "-").replace(/^-+/, "").replace(/-+$/, "");
}

export function run<TContext extends (...args: any) => any>(
  callback: () => ReturnType<TContext>,
  mount?: HTMLElementWithData
) {
  const computedMount =
    mount || document.querySelector(`[data-define=${getMountElementName()}]`);

  if (!computedMount) return;
  const context = callback();
  /* TODO: FIX TYPING AND REMOVE AS */
  let current: HTMLElementWithData;
  let next = computedMount.firstChild as HTMLElementWithData;
  while (next) {
    current = next;
    const type = current.nodeType;
    if (type === 1 && current.hasAttribute("data-define")) break;

    processNode<TContext>(current, context);
    next =
      (run(() => context, current) as HTMLElementWithData) || next.nextSibling;
  }
  return next;
}

function processNode<TContext>(el: HTMLElementWithData, context: TContext) {
  const type = el.nodeType;

  // element
  if (type === 1) {
    for (const { name, value } of [...el.attributes]) {
      const jAttr = name.slice(1);
      if (name[0] === "$") {
        const eventList = [
          "click",
          "mouseover",
          "mouseout",
          "change",
          "keydown",
        ];
        if (eventList.find((eventName) => eventName === jAttr)) {
          el.addEventListener(jAttr, () => tmpl(`{${value}}`, context));
          el.removeAttribute(name);
        }
        if (jAttr === "display") {
          newEffect(() => {
            el.style.display = tmpl(`{${value}}`, context) ? "block" : "none";
          });
          el.removeAttribute(name);
        }
      }
      if (name[0] === ":") {
        const attrValue = el.getAttribute(name);
        el.removeAttribute(name);
        newEffect(() => {
          el.setAttribute(jAttr, tmpl(attrValue, context));
        });
      }
    }
  }
  // text node
  else if (type === 3) {
    if (tmpl.hasExpr(el.data) && el.data) {
      if (/(\(.*\))?(\.)?/g.test(el.data)) {
        newEffect(() => {
          const expr = tmpl(el.data, context);
          if (expr) {
            el.data = expr;
          }
        });
      } else el.data = tmpl(el.data, context);
    }
  }
}
