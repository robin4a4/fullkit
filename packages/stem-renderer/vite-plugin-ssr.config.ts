export default {
  // For vite-plugin-ssr@0.4.53+
  extensions: [
    {
      npmPackageName: "@fullkit/stem-renderer",
      pageFilesDist: [
        "@fullkit/stem-renderer/renderer/_default.page.server.js",
        "@fullkit/stem-renderer/renderer/_default.page.client.js",
      ],
    },
  ],
  // For vite-plugin-ssr@0.4.52 -- TODO: remove
  pageFiles: {
    addPageFiles: [
      "@fullkit/stem-renderer/renderer/_default.page.server.js",
      "@fullkit/stem-renderer/renderer/_default.page.client.js",
    ],
  },
};
