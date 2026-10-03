const { defineConfig, devices } = require("@playwright/test");
require("dotenv").config();

const config = {
  testDir: "./tests",
  timeout: 30 * 1000,
  expect: {
    timeout: 20 * 1000,
  },

  headless: false,

  reporter: "html",

  use: {
    baseURL: process.env.ECOM_BASE_URL || "https://rahulshettyacademy.com",
    browserName: "chromium",
    screenshot: "on",
    trace: "on",
  },

  /* Configure projects for major browsers */
};

module.exports = config;
