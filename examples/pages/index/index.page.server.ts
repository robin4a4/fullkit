import { Template } from "@renderkit/stem-renderer";
import { MainLayout } from "../../layouts/layout";

export class Page extends Template {
  templateName = "home.html";
  layout = MainLayout;

  getContextData() {
    return {
      test: "world",
    };
  }
}
