import { Layout } from "@renderkit/stem-renderer";
import "../index.css";
import logo from "./components/logo.png";
import { getCategories } from "../api/api";

export class MainLayout extends Layout {
  templateName = "layout.html";

  async getData() {
    const response = await getCategories();
    if (response.status === 404) {
      return {
        body: [],
        status: 404,
      };
    }
    if (response.status === 200) return response;
    throw new Error(response.status.toString());
  }

  async getContextData() {
    const data = await this.getData();
    console.log(logo);
    return {
      testLayout: "salut",
      categories: data.body,
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
