import { View } from "@renderkit/server";

// TODO Error class
export class Page extends View {
  templateName = "home.html";

  getContextData() {
    return {
      test: "world",
    };
  }
}
