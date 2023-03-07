export default {
  // For vite-plugin-ssr@0.4.53+
  extensions: [
    {
      npmPackageName: "@renderkit/renderer",
      pageFilesDist: [
        "@renderkit/renderer/dist/renderer/_default.page.server.js",
        // "@renderkit/renderer/renderer/_default.page.client.js",
      ],
    },
  ],
};
