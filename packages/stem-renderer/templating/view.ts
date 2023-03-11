import { HtmlParser } from "compile-include-html";
import { BaseViewContext, PageContext } from "../types";

export class NotImplementedError extends Error {
  constructor() {
    super();
    this.name = "NotImplementedError";
  }
}

type BaseViewConfig = {
  urlPathname: PageContext["urlPathname"];
  routeParams: PageContext["routeParams"];
};

export abstract class BaseView {
  templateName: string;
  urlPathname: BaseViewConfig["urlPathname"];
  routeParams: Exclude<BaseViewConfig["routeParams"], undefined>;
  pageParam: keyof Exclude<BaseViewConfig["routeParams"], undefined> | null;

  constructor(config: BaseViewConfig) {
    this.urlPathname = config.urlPathname;
    this.routeParams = config.routeParams || {};
    this.pageParam = null;
    const splitUrl = this.urlPathname.split("/");
    if (splitUrl.length > 1) {
      const currentPageIdentifier = splitUrl[splitUrl.length - 1];
      for (const [, value] of Object.entries(this.routeParams)) {
        if (currentPageIdentifier === value) {
          this.pageParam = value;
        }
      }
    }
  }

  get basePath(): string {
    throw new NotImplementedError();
  }

  _renderHtml(contextData: BaseViewContext) {
    const includer = new HtmlParser({
      globalContext: contextData,
      basePath: this.basePath,
    });
    const source = includer.readFile(this.templateName);
    return includer.transform(source);
  }
  getContextData(
    layoutContext?: BaseViewContext
  ): BaseViewContext | Promise<BaseViewContext> {
    throw new NotImplementedError();
  }
}

export class View extends BaseView {
  layoutClass?: typeof Layout;

  get basePath(): string {
    let base =
      this.urlPathname !== "/" ? `./pages${this.urlPathname}` : `./pages`;
    if (this.routeParams) {
      for (const [key, value] of Object.entries(this.routeParams)) {
        base = base.replaceAll(value, `@${key}`);
      }
    }
    return base;
  }

  mergeContextData(
    contentContext: BaseViewContext,
    layoutContext: BaseViewContext
  ): BaseViewContext {
    return { ...layoutContext, ...contentContext };
  }

  /**
   * Entry point for rendering a page
   *
   * @returns
   */
  async render() {
    if (this.layoutClass) {
      const layout = new this.layoutClass({
        urlPathname: this.urlPathname,
        routeParams: this.routeParams,
      });
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

export class Layout extends BaseView {
  get basePath(): string {
    return `./layouts`;
  }

  createPath() {
    return `${this.templateName}`;
  }
}
