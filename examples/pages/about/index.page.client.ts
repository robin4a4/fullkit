import { signal } from "@fullkit/client/reactivity";
import { define, Component, effect } from "@fullkit/client/custom-elements";

@define
export class ButtonComponent extends Component {
  count = signal(0);

  @effect
  testMethod() {
    console.log(this.count.value);
  }

  getContextData() {
    this.testMethod();
    return { count: this.count };
  }
}
