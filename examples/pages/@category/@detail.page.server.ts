import { View } from "@fullkit/stem-renderer";

export class Page extends View {
  templateName = "home.html";

  getContextData() {
    return {
      test: this.pageParam,
    };
  }
}
