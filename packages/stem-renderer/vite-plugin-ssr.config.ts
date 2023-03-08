export default {
  // For vite-plugin-ssr@0.4.53+
  extensions: [
    {
      npmPackageName: '@renderkit/stem-renderer',
      pageFilesDist: [
        '@renderkit/stem-renderer/renderer/_default.page.server.js',
        '@renderkit/stem-renderer/renderer/_default.page.client.js'
      ]
    }
  ],
  // For vite-plugin-ssr@0.4.52 -- TODO: remove
  pageFiles: {
    addPageFiles: [
      '@renderkit/stem-renderer/renderer/_default.page.server.js',
      '@renderkit/stem-renderer/renderer/_default.page.client.js'
    ]
  }
}
