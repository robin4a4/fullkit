import { Template } from "@renderkit/stem-renderer/templating";
import { MainLayout } from "../../layouts/layout";

export class Page extends Template {
  templateName = "templates/about.html";
  layout = MainLayout;

  getContextData() {
    return {
      buttonContent: "hello",
    };
  }

  post(requestBody: Record<string, any>) {
    console.log(requestBody);
    return super.post(requestBody);
  }
}
