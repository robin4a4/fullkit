import {
  Component,
  define,
  FullkitForm,
} from "@fullkit/client/custom-elements";
import { signal } from "@fullkit/client/reactivity";

const noTransitionEl = document.querySelector(".no-transition");
if (noTransitionEl) noTransitionEl.classList.remove("no-transition");

@define
export class LinkForm extends FullkitForm {
  isOpen = signal(false);
  errorMessage = signal<string | null>(null);

  getContextData() {
    return {
      isOpen: this.isOpen,
      ...super.getContextData(),
    };
  }
}

@define
export class LinksList extends Component {
  connectedCallback(): void {
    const linksList = this.querySelector("#links-list") as HTMLDListElement;

    document.addEventListener("link-form-valid", (evt) => {
      console.log("sdfkjhskjh");
      const link = evt.detail;
      console.log(link);
      const linkEl = document.createElement("li");
      linkEl.innerHTML = `<include src="test.html"/>`;
      linksList.prepend(linkEl);
    });

    super.connectedCallback();
  }
}
