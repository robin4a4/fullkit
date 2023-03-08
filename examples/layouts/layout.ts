import { Layout } from "@renderkit/stem-renderer/templating";
import "../index.css";

export class MainLayout extends Layout {
  templateName = "layout.html";

  async getData() {
    const response = await api("GET", { categoryName: params.categoryName });
    if (response.status === 404) {
      return {
        links: [],
        categories: [],
        currentCategory: params.categoryName,
      };
    }
    if (response.status === 200)
      return { ...response.body, currentCategory: params.categoryName } as {
        links: Link[];
        categories: Category[];
        currentCategory: string;
      };
    throw error(response.status);
  }

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
