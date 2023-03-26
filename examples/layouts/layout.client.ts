import { Component, define } from "@fullkit/client/custom-elements";
import { signal } from "@fullkit/client/reactivity";

const noTransitionEl = document.querySelector("no-transition");
if (noTransitionEl) noTransitionEl.classList.remove("no-transition");

@define
export class LinkForm extends Component {
  isOpen = signal(false);
  getContextData() {
    return {
      isOpen: this.isOpen,
    };
  }
}
