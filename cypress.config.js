const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity:false,
  e2e: {
    baseUrl:"https://opensource-demo.orangehrmlive.com//",
    watchForFileChanges:false,
    setupNodeEvents(on, config) {
      config.specPattern = [
        'cypress/e2e/OrangeHRM*.cy.js', 
      ]
      return config;
    },
  },
});