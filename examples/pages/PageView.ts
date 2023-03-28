import { View } from "@fullkit/stem-renderer";
import { MainLayout } from "../layouts/layout.server";
import { getLinks, postLink } from "../lib/api";

export class PageView extends View {
  templateName = "page.html";
  layoutClass = MainLayout;

  async getContextData() {
    const links = await getLinks(this.pageParam);

    return {
      links: links.body,
    };
  }

  async post(requestBody: Record<string, any>) {
    const link = requestBody;
    link.categoryId = this.pageParam;
    postLink(link);
    return requestBody;
  }
}
