import { HtmlParser } from "compile-include-html";

export class NotImplementedError extends Error {
  constructor() {
    super();
    this.name = "NotImplementedError";
  }
}

type BaseTemplateConfig = {
  urlPathname: string;
};

export class BaseTemplate {
  basePath: string;
  templateName: string;

  createPath(): string {
    throw new NotImplementedError();
  }

  renderHtml() {
    const includer = new HtmlParser({ globalContext: this.getContextData() });
    const path = this.createPath();
    const source = includer.readFile(path);
    return includer.transform(source);
  }

  getContextData(): Record<string, any> {
    throw new NotImplementedError();
  }
}

export class Template extends BaseTemplate {
  basePath = "./pages";
  layout?: typeof Layout;
  urlPathname: BaseTemplateConfig["urlPathname"];

  constructor(config: BaseTemplateConfig) {
    super();
    this.urlPathname = config.urlPathname;
  }

  createPath() {
    return this.urlPathname !== "/"
      ? `${this.basePath}/${this.urlPathname}/${this.templateName}`
      : `${this.basePath}/index/${this.templateName}`;
  }

  render() {
    if (this.layout) {
      const layout = new this.layout();
      const layoutHtml = layout.renderHtml();
      const contentHtml = super.renderHtml();
      return layoutHtml.replaceAll("<slot></slot>", contentHtml);
    }
    return super.renderHtml();
  }

  post(requestBody: Record<string, any>) {
    return requestBody;
  }
}

export class Layout extends BaseTemplate {
  basePath = "./layouts";

  createPath() {
    return `${this.basePath}/${this.templateName}`;
  }
}
