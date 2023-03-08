import { PageContextServer } from "../types";

export function createHtml(pageContext: PageContextServer) {
  const { Page, urlPathname } = pageContext;
  const page = new Page({ urlPathname });
  return page.render();
}
