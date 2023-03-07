import { Template } from "@renderkit/server";

export class Page extends Template {
  templateName = "home.html";

  getContextData() {
    return {
      test: "world",
    };
  }
}
