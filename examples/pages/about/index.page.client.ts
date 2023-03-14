import { run, newSignal, Component, define } from "@fullkit/client";

@define
export class ButtonComponent extends Component {
  getContextData() {
    const [count, setCount] = newSignal(0);
    return "";
  }
}
