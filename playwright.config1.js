const { defineConfig, devices } = require("@playwright/test");

const config = {
  testDir: "./tests",
  timeout: 30 * 1000,
  expect: {
    timeout: 20 * 1000,
  },

  headless: false,

  reporter: "html",

  projects: [
    {
      name: "safari",
      use: {
        browserName: "webkit",
        screenshot: "on",
        trace: "on",
        ignoreHttpsError: true,
        permissions: ['geolocation'],
       // video:"on",
        retries:1,
      //  viewport: {width:720, height:720},
      },
    },
    {
      name: "chrome",
      use: {
        browserName: "chromium",
        screenshot: "on",
        trace: "on",
        ...devices['iPhone 17 Pro Max']
      },
    },
  ],

  /* Configure projects for major browsers */
};

module.exports = config;
