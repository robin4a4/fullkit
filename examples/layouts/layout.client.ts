import { Component, define, Form } from "@fullkit/client/custom-elements";
import { signal } from "@fullkit/client/reactivity";
import { getColorsFromCategory } from "./utils";

const noTransitionEl = document.querySelector(".no-transition");
if (noTransitionEl) noTransitionEl.classList.remove("no-transition");

@define
export class LinkForm extends Form {
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

    this.listenEvent("link-form-valid", (linkDetail) => {
      const linkEl = document.createElement("div");
      const category = { ...linkDetail.category, name: "test" };
      const pageParam = null;
      const hideTitle = true;
      linkEl.innerHTML = `<include src="../components/link_content.html" with="link: ${linkDetail}; category: ${category}; pageParam: ${pageParam}; getColorsFromCategory: ${getColorsFromCategory} hideTitle: ${hideTitle}"></include>`;
      linksList.prepend(linkEl);
    });

    super.connectedCallback();
  }
}
