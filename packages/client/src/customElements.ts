import { run } from "./renderer";

export class NotImplementedError extends Error {
  constructor() {
    super();
    this.name = "NotImplementedError";
  }
}

function dasherize(str: unknown): string {
  return String(typeof str === "symbol" ? str.description : str)
    .replace(/([A-Z]($|[a-z]))/g, "-$1")
    .replace(/--/g, "-")
    .replace(/^-|-$/, "")
    .toLowerCase();
}

export function define(classObject: CustomElementConstructor) {
  window.customElements.define(dasherize(classObject.name), classObject);
}

export class Component extends HTMLElement {
  connectedCallback() {
    run(() => this.getContextData(), this);
  }
  getContextData(): Record<string, any> {
    throw new NotImplementedError();
  }
}

@define
export class FullkitForm extends HTMLElement {
  connectedCallback() {
    const form = this.querySelector("form") as HTMLFormElement;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      fetch(form.action, {
        method: form.method,
        body: data,
      }).then((res) => {
        if (res.status === 200) {
          form.reset();
        }
      });
    });
  }
}
