import { View } from "@renderkit/stem-renderer";
import { MainLayout } from "../../layouts/layout";

export class Page extends View {
  templateName = "home.html";
  layout = MainLayout;

  getContextData() {
    return {
      test: "world",
    };
  }
}
