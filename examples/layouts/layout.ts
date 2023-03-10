import { Layout } from "@renderkit/stem-renderer";
import "../index.css";
import { getCategories } from "../api/api";

const colorObject = {
  design: "blue",
  javascript: "red",
  python: "orange",
  css: "purple",
  computing: "yellow",
};

export class MainLayout extends Layout {
  templateName = "layout.html";

  getColorsFromCategories(categoryName: string) {
    if (categoryName in colorObject) return colorObject[categoryName];
    return "slate";
  }

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
    return {
      pageParam: this.pageParam,
      categories: data.body,
      getColorsFromCategory: this.getColorsFromCategories,
    };
  }
}
