import { Template } from "@renderkit/stem-renderer/templating";
import { api } from "../../api/api";
import { MainLayout } from "../../layouts/layout";

export class Page extends Template {
  templateName = "templates/about.html";
  layout = MainLayout;

  getContextData() {
    return {
      buttonContent: "hello",
    };
  }

  async post(requestBody: Record<string, any>) {
    console.log(requestBody);
    requestBody.categoryId = parseInt(requestBody.categoryId, 10);
    const data = requestBody as Link;
    await api("POST", { data });
    return super.post(requestBody);
  }
}
