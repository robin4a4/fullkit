import { View } from "@fullkit/stem-renderer";

export class Page extends View {
  templateName = "about.html";

  getContextData() {
    return {};
  }

  post(requestBody: any) {
    console.log(requestBody);
    return super.post(requestBody);
  }
}
