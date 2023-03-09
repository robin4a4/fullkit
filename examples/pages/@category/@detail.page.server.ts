import { View } from "@renderkit/stem-renderer";

export class Page extends View {
  templateName = "home.html";

  getContextData() {
    return {
      test: this.pageParam,
    };
  }
}
