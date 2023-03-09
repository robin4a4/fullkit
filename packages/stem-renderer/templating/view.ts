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

export abstract class BaseTemplate {
  templateName: string;
  urlPathname: BaseTemplateConfig["urlPathname"];

  constructor(config: BaseTemplateConfig) {
    this.urlPathname = config.urlPathname;
  }

  get basePath(): string {
    throw new NotImplementedError();
  }

  _renderHtml(contextData: BaseTemplateContext) {
    const includer = new HtmlParser({
      globalContext: contextData,
      basePath: this.basePath,
    });
    const source = includer.readFile(this.templateName);
    return includer.transform(source);
  }
  getContextData(
    layoutContext?: BaseTemplateContext
  ): BaseTemplateContext | Promise<BaseTemplateContext> {
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

  mergeContextData(
    contentContext: BaseTemplateContext,
    layoutContext: BaseTemplateContext
  ): BaseTemplateContext {
    return { ...layoutContext, ...contentContext };
  }

  /**
   * Entry point for rendering a page
   *
   * @returns
   */
  async render() {
    if (this.layout) {
      const layout = new this.layout({ urlPathname: this.urlPathname });
      const layoutContext = await Promise.resolve(layout.getContextData());
      const contentContext = await Promise.resolve(
        this.getContextData(layoutContext)
      );
      const mergeContextData = this.mergeContextData(
        contentContext,
        layoutContext
      );
      const layoutHtml = layout._renderHtml(layoutContext);
      const contentHtml = super._renderHtml(mergeContextData);
      return layoutHtml.replaceAll("<slot></slot>", contentHtml);
    }
    const contextData = await Promise.resolve(this.getContextData());
    return super._renderHtml(contextData);
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
