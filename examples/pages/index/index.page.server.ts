import { Template } from "@renderkit/server";
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
