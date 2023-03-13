// @ts-ignore
import { tmpl } from "riot-tmpl";
import { newEffect } from "./reactivity";

/**
 * Reactive dom attribute
 */
interface HTMLElementWithData extends HTMLElement {
  data?: string;
}

export function run<TContext extends (...args: any) => any>(
  callback: () => ReturnType<TContext>,
  mount: HTMLElementWithData
) {
  if (!mount) return;
  const context = callback();
  /* TODO: FIX TYPING AND REMOVE AS */
  let current: HTMLElementWithData;
  let next = mount.firstChild as HTMLElementWithData;
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
  console.log;
  // element
  if (type === 1) {
    for (const { name, value } of [...el.attributes]) {
      const splitAttName = name.split(":");
      if (splitAttName.length !== 2) continue;
      const [method, attrName] = splitAttName;
      if (method === "on") {
        el.addEventListener(attrName, () => tmpl(`{(${value})()}`, context));
        el.removeAttribute(name);
        if (attrName === "display") {
          newEffect(() => {
            el.style.display = tmpl(`{${value}}`, context) ? "block" : "none";
          });
          el.removeAttribute(name);
        }
      }
      if (method === "bind") {
        const attrValue = el.getAttribute(name);
        el.removeAttribute(name);
        newEffect(() => {
          el.setAttribute(attrName, tmpl(attrValue, context));
        });
      }
    }
  }
  // text node
  else if (type === 3) {
    if (tmpl.hasExpr(el.data) && el.data) {
      if (/(\(.*\))?(\.)?/g.test(el.data)) {
        const originalTextContent = el.textContent;
        newEffect(() => {
          if (el.data) {
            const expr = tmpl(originalTextContent, context);
            if (expr) {
              el.data = expr;
            }
          }
        });
      } else el.data = tmpl(el.data, context);
    }
  }
}
