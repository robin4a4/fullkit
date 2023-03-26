import { Layout } from "@fullkit/stem-renderer";
import "../index.css";
import { getCategories } from "../lib/api";

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

  async getContextData() {
    const data = await getCategories();
    return {
      pageParam: this.pageParam,
      categories: data.body,
      getColorsFromCategory: this.getColorsFromCategories,
    };
  }
}
