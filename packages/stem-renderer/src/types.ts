import type {
  PageContextBuiltIn,
  PageContextBuiltInClientWithServerRouting as PageContextBuiltInClient,
} from "vite-plugin-ssr/types";
import { BaseView, View } from "./templating/view";

export type Page = typeof View;
export type PageProps = object;

export type PageContextCustom = {
  Page: Page;
  pageProps?: PageProps;
  urlPathname: string;
  exports: {
    documentProps?: {
      title?: string;
      description?: string;
    };
  };
};

export type PageContextServer = PageContextBuiltIn<Page> & PageContextCustom;
export type PageContextClient = PageContextBuiltInClient<Page> &
  PageContextCustom;

export type PageContext = PageContextClient | PageContextServer;

export type BaseViewContext = Record<string, any>;
export type ViewContext<T extends BaseView> = Awaited<
  ReturnType<T["getContextData"]>
>;
