import { Layout } from "@renderkit/server";

export class MainLayout extends Layout {
  templateName = "test.html";

  getContextData() {
    return {
      test: "salut",
      nav: [
        { href: "/about", name: "about" },
        { href: "/", name: "home" },
      ],
    };
  }
}
