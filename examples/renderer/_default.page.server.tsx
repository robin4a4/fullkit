import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr'
import logoUrl from './logo.svg'
import type { PageContextServer } from './types'
import {Includer} from "compile-include-html"

export { render }

function renderPage(pageContext: PageContextServer) {
  const { Page, urlPathname } = pageContext
  const {template} = Page()
  const includer = new Includer();
  const source = includer.readFile(`./pages/${urlPathname}/${template}`)
  return includer.transform(source)
}


async function render(pageContext: PageContextServer) {

  // See https://vite-plugin-ssr.com/head
  const { documentProps } = pageContext.exports
  const title = (documentProps && documentProps.title) || 'Vite SSR app'
  const desc = (documentProps && documentProps.description) || 'App using Vite + vite-plugin-ssr'
  const html = renderPage(pageContext)
  
  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="page-view">${dangerouslySkipEscape(html)}</div>
      </body>
    </html>`

  return {
    documentHtml,
  }
}
