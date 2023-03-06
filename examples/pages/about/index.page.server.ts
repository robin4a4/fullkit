import { newSignal } from "@renderkit/client";
import { View } from "@renderkit/server";

export { layout } from "../../layouts/layout";

export class Page extends View {
  templateName = "button.html";

  getContextData() {
    const [isOpen, setIsOpen] = newSignal(false);
    return {
      buttonContent: "hello",
      buttonCallback: () => setIsOpen(!isOpen()),
    };
  }

  post(requestBody: Record<string, any>) {
    console.log(requestBody);
    return super.post(requestBody);
  }
}

// import { startServer } from "@renderkit/server";

// startServer(import.meta.url);
