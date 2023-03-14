import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import multer from "multer";
import { renderPage } from "vite-plugin-ssr";
import { dirname } from "path";
import { fileURLToPath } from "url";
import type { Page } from "@fullkit/stem-renderer";

const isProduction = process.env.NODE_ENV === "production";

type TOptions = { root?: string };

// not working
export async function startServer(options?: TOptions) {
  const processUrl = options?.root || import.meta.url || "";
  const root = processUrl ? `${dirname(fileURLToPath(processUrl))}/..` : "";
  const app = express();

  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  const upload = multer();

  if (isProduction) {
    const sirv = (await import("sirv")).default;
    app.use(sirv(`${root}/dist/client`));
  } else {
    const vite = await import("vite");
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true },
      })
    ).middlewares;
    app.use(viteDevMiddleware);
  }

  app.get("*", async (req, res, next) => {
    console.log("[GET] -", req.originalUrl);
    const pageContextInit = {
      urlOriginal: req.originalUrl,
    };
    const pageContext = await renderPage<
      { Page: Page },
      typeof pageContextInit
    >(pageContextInit);
    const { httpResponse } = pageContext;
    if (!httpResponse) return next();
    const { body, statusCode, contentType, earlyHints } = httpResponse;
    if (res.writeEarlyHints)
      res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) });
    res.status(statusCode).type(contentType).send(body);
  });

  app.post("*", upload.none(), async (req, res, next) => {
    console.log("[POST] -", req.originalUrl);
    const pageContextInit = {
      urlOriginal: req.originalUrl,
    };
    const pageContext = await renderPage<
      { Page: Page },
      typeof pageContextInit
    >(pageContextInit);
    const { httpResponse, Page } = pageContext;
    if (!httpResponse) return next();
    const page = new Page({ urlPathname: "test", routeParams: {} });
    page.post(req.body);
    const { body, statusCode, contentType, earlyHints } = httpResponse;

    if (res.writeEarlyHints)
      res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) });
    res.status(statusCode).type(contentType).send(body);
  });

  const port = process.env.PORT || 3000;
  app.listen(port);
  console.log(`Server running at http://localhost:${port}`);
}
