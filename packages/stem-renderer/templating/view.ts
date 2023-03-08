import { HtmlParser } from "compile-include-html";
import { BaseTemplateContext, TemplateContext } from "../types";

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

  renderHtml(contextData: BaseTemplateContext) {
    const includer = new HtmlParser({
      globalContext: contextData,
      basePath: this.basePath,
    });
    const source = includer.readFile(this.templateName);
    return includer.transform(source);
  }
  getContextData(layoutContext?: BaseTemplateContext): BaseTemplateContext {
    console.log("--- LAYOUT WHAT ---", layoutContext);

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

  getContextData(layoutContext?: BaseTemplateContext): BaseTemplateContext {
    const userContext = super.getContextData();
    if (layoutContext) {
      return { test: "jkhfdkj" };
    }
    return super.getContextData();
  }
  /**
   * Entry point for rendering a page
   *
   * @returns
   */
  render() {
    if (this.layout) {
      const layout = new this.layout({ urlPathname: this.urlPathname });
      const layoutContext = layout.getContextData();
      const contentContext = this.getContextData(layoutContext);
      console.log("--- layout --- >", layoutContext);
      console.log("--- content --- >", contentContext);

      const layoutHtml = layout.renderHtml(layoutContext);

      const contentHtml = super.renderHtml(contentContext);
      return layoutHtml.replaceAll("<slot></slot>", contentHtml);
    }
    return super.renderHtml(this.getContextData());
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
