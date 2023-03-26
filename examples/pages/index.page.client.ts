import { Component, define } from "@fullkit/client/custom-elements";
import { signal } from "@fullkit/client/reactivity";

@define
export class LinkForm extends Component {
  isOpen = signal(false);
  getContextData() {
    return {
      isOpen: this.isOpen,
    };
  }
}
