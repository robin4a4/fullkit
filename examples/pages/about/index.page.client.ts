import { run, newSignal, Component, define } from "@fullkit/client";

run(() => {
  const [count, setCount] = newSignal(0);
  return {
    count,
    setCount,
  };
}, document.getElementById("app")!);

@define
export class ButtonComponent extends Component {
  getContextData() {
    const [count, setCount] = newSignal(0);
    return {
      count,
      setCount,
    };
  }
}
