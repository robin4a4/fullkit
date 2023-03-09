import { Template, TemplateContext } from "@renderkit/stem-renderer";
import { api } from "../../api/api";
import { MainLayout } from "../../layouts/layout";

export class Page extends Template {
  templateName = "templates/about.html";
  layout = MainLayout;

  async getContextData(layoutContext: TemplateContext<MainLayout>) {
    return {
      testLayout: "override",
      buttonContent: layoutContext.testLayout,
    };
  }

  async post(requestBody: Record<string, any>) {
    console.log(requestBody);
    requestBody.categoryId = parseInt(requestBody.categoryId, 10);
    const data = requestBody as any;
    await api("POST", { data });
    return super.post(requestBody);
  }
}
