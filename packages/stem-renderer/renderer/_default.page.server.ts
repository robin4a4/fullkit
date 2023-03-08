import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr'
import { PageContextServer } from '../types'
import { createHtml } from './createHtml'

export { render }

async function render(pageContext: PageContextServer) {
  // See https://vite-plugin-ssr.com/head
  const { documentProps } = pageContext.exports
  const title = (documentProps && documentProps.title) || 'Vite SSR app'
  const desc = (documentProps && documentProps.description) || 'App using Vite + vite-plugin-ssr'
  const html = createHtml(pageContext)

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="page-view">${dangerouslySkipEscape(html)}</div>
      </body>
    </html>`

  return {
    documentHtml
  }
}
