import { View } from "@fullkit/stem-renderer";
import { MainLayout } from "../layouts/layout";
import { getLinks } from "../lib/api";

export class PageView extends View {
  templateName = "page.html";
  layoutClass = MainLayout;

  async getContextData() {
    const links = await getLinks(this.pageParam);

    return {
      links: links.body,
    };
  }
}
