import { View } from "@renderkit/server";

export class Page extends View {
  templateName = "home.html";

  getContextData() {
    return {
      test: "world",
    };
  }
}
