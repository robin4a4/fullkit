import { PageContextServer } from "../types";

export async function createHtml(pageContext: PageContextServer) {
  const { Page, urlPathname } = pageContext;
  const page = new Page({ urlPathname });
  return page.render();
}
