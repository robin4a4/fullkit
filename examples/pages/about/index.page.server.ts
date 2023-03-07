import { newSignal } from "@renderkit/client";
import { Template } from "@renderkit/server";
import { MainLayout } from "../../layouts/layout";

export class Page extends Template {
  templateName = "button.html";
  layout = MainLayout;

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
