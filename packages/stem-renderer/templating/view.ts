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
  templateName: string;
  urlPathname: BaseTemplateConfig["urlPathname"];

  constructor(config: BaseTemplateConfig) {
    this.urlPathname = config.urlPathname;
  }

  get basePath(): string {
    throw new NotImplementedError();
  }

  renderHtml() {
    const includer = new HtmlParser({
      globalContext: this.getContextData(),
      basePath: this.basePath,
    });
    const source = includer.readFile(this.templateName);
    return includer.transform(source);
  }

  getContextData(): Record<string, any> {
    throw new NotImplementedError();
  }
}

export class Template extends BaseTemplate {
  layout?: typeof Layout;

  get basePath(): string {
    return this.urlPathname !== "/"
      ? `./pages${this.urlPathname}`
      : `./pages/index`;
  }

  render() {
    if (this.layout) {
      const layout = new this.layout({ urlPathname: this.urlPathname });
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
  get basePath(): string {
    return `./layouts`;
  }

  createPath() {
    return `${this.templateName}`;
  }
}
