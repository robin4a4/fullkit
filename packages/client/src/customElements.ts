import { signal } from "./reactivity";
import { run } from "./renderer";

function formDataToObject(data: FormData) {
  const obj: Record<string, any> = {};
  for (const [key, value] of data.entries()) {
    obj[key] = value;
  }
  return obj;
}

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
    return {};
  }

  listenEvent(
    eventName: string,
    callback: (payload: Record<string, any>) => void
  ) {
    // @ts-ignore
    document.addEventListener(eventName, (event: CustomEvent) => {
      callback(event.detail);
    });
  }
}

export class Form extends Component {
  isLoading = signal(false);

  getContextData() {
    return {
      isLoading: this.isLoading,
    };
  }

  formValid(data: Record<string, any>) {
    const evt = new CustomEvent(`${dasherize(this.constructor.name)}-valid`, {
      bubbles: true,
      cancelable: false,
      detail: data,
    });
    document.dispatchEvent(evt);
  }

  formInvalid(data: Record<string, any>, err: Error) {
    const evt = new CustomEvent(`${dasherize(this.constructor.name)}-valid`, {
      bubbles: true,
      cancelable: false,
      detail: { ...data, error: err },
    });
    document.dispatchEvent(evt);
  }

  connectedCallback() {
    const form = this.querySelector("form") as HTMLFormElement;
    form.addEventListener("submit", (e) => {
      this.isLoading.value = true;
      e.preventDefault();

      const data = new FormData(form);
      fetch(form.action, {
        method: form.method,
        body: data,
      })
        .then((res) => {
          if (res.status === 200) {
            form.reset();
            this.formValid(formDataToObject(data));
          } else {
            const error = new Error(res.status.toString());
            this.formInvalid(formDataToObject(data), error);
          }
        })
        .catch((err) => {
          this.formInvalid(formDataToObject(data), err);
        })
        .finally(() => {
          this.isLoading.value = false;
        });
    });
    return super.connectedCallback();
  }
}
