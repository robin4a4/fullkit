import { Layout } from "@renderkit/stem-renderer";
import "../index.css";
import fetch from "node-fetch";

export class MainLayout extends Layout {
  templateName = "layout.html";

  async getData() {
    return fetch("https://jsonplaceholder.typicode.com/todos").then(
      (response) => response.json()
    );
    // const response = await api("GET", { categoryName: params.categoryName });
    // if (response.status === 404) {
    //   return {
    //     links: [],
    //     categories: [],
    //     currentCategory: params.categoryName,
    //   };
    // }
    // if (response.status === 200)
    //   return { ...response.body, currentCategory: params.categoryName } as {
    //     links: any[];
    //     categories: any[];
    //     currentCategory: string;
    //   };
    // throw new Error(response.status);
  }

  async getContextData() {
    const data = await this.getData();
    return {
      testLayout: "salut",
      data: data,
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
