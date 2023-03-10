import { View } from "@renderkit/stem-renderer";
import { MainLayout } from "../../layouts/layout";

export class Page extends View {
  templateName = "home.html";
  layoutClass = MainLayout;

  getContextData() {
    console.log("pageParam", this.pageParam);
    return {
      test: "world",
    };
  }
}
