import { Layout } from "@renderkit/renderer/templating";

import "../index.css";

export class MainLayout extends Layout {
  templateName = "layout.html";

  getContextData() {
    return {
      test: "salut",
      nav: [
        {
          href: "/about",
          name: "about",
          isActive: this.urlPathname === "/about",
        },
        {
          href: "/",
          name: "home",
          isActive: this.urlPathname === "/",
        },
      ],
    };
  }
}
