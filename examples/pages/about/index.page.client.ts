import { signal, Component, define } from "@fullkit/client";

@define
export class ButtonComponent extends Component {
  count = signal(0);

  getContextData() {
    return { count: this.count };
  }
}
