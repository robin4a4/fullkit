import { View } from "@fullkit/stem-renderer";
import { MainLayout } from "../layouts/layout";

export class Page extends View {
  templateName = "home.html";
  layoutClass = MainLayout;

  getContextData() {
    return {
      test: "world",
    };
  }
}
