import { PageContextServer } from "../types";

export async function createHtml(pageContext: PageContextServer) {
  const { Page, urlPathname, routeParams } = pageContext;
  const page = new Page({ urlPathname, routeParams });
  return page.render();
}
