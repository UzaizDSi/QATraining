
import { locators } from '../locators';

class LoginPage {
  visit() {
    cy.visit('/');
  }

  verifyTitle() {
    cy.title().should('eq', 'OrangeHRM');
  }

  login(username, password) {
    cy.get(locators.login.username).type(username);
    cy.get(locators.login.password).type(password);
    cy.get(locators.login.submitButton).click();
  }

  verifyLoginSuccess(fullName) {
    cy.get(locators.dashboard.welcomeMessage).should('have.text', fullName);
  }
}

export default LoginPage;
