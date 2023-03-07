import { Layout } from "@renderkit/server";

export class TestLayout extends Layout {
  templateName = "test-layout.html";

  getContextData() {
    return {
      test: "salut",
      nav: [
        {
          href: "/about",
          name: "about",
          style: this.urlPathname === "/about" ? "background: red;" : "",
        },
        {
          href: "/",
          name: "home",
          style: this.urlPathname === "/" ? "background: red;" : "",
        },
      ],
    };
  }
}
