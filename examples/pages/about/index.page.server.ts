import { View, ViewContext } from "@renderkit/stem-renderer";
import { MainLayout } from "../../layouts/layout";

export class Page extends View {
  templateName = "templates/about.html";
  layoutClass = MainLayout;

  async getContextData(layoutContext: ViewContext<MainLayout>) {
    return {
      testLayout: "override",
      buttonContent: layoutContext.testLayout,
    };
  }

  async post(requestBody: Record<string, any>) {
    console.log(requestBody);
    requestBody.categoryId = parseInt(requestBody.categoryId, 10);
    const data = requestBody as any;
    // await api("POST", { data });
    return super.post(requestBody);
  }
}
