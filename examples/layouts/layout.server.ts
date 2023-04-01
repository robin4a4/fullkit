import { Layout } from "@fullkit/stem-renderer";
import "../index.css";
import { getCategories } from "../lib/api";
import { getColorsFromCategory } from "./utils";

export class MainLayout extends Layout {
  templateName = "layout.html";

  async getContextData() {
    const data = await getCategories();
    return {
      pageParam: this.pageParam,
      categories: data.body,
      getColorsFromCategory,
    };
  }
}
