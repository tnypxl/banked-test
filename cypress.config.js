const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://demo.banked.com",
    specPattern: "tests/**/*.spec.js",
    fixturesFolder: "./fixtures",
    supportFolder: "./support",
    supportFile: "./support/e2e.js",
    downloadsFolder: "./downloads",
    screenshotsFolder: "./screenshots",
    headless: true,

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
