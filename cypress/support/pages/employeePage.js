
import { locators } from '../locators';

class EmployeePage {
  clickAddEmployee() {
    cy.get(locators.employee.addEmployeeButton).click();
    cy.get('h6').should('be.visible');
  }

  fillEmployeeForm(firstName, lastName, username, password) {
    cy.get(locators.employee.firstNameInput).type(firstName);
    cy.get(locators.employee.lastNameInput).type(lastName);
    cy.get("input[type='checkbox']").click({ force: true });
    cy.get(locators.employee.usernameInput).parent().siblings('div').find('input').type(username);
    cy.get(locators.employee.passwordInput).parent().siblings('div').find('input').type(password);
    cy.get(locators.employee.confirmPasswordInput).parent().siblings('div').find('input').type(password);
    cy.get(locators.employee.submitButton).click();
  }

  getEmployeeId() {
    return cy.get(locators.employee.employeeIdInput).invoke('val');
  }

  searchEmployeeById(employeeID) {
    cy.get(locators.employee.employeeIdInput).type(employeeID);
    cy.get(locators.employee.submitButton).click();
  }

  selectEmployeeFromDirectory(firstName) {
    cy.get(locators.employee.directorySearchInput).type(firstName);
    cy.get(locators.employee.directoryAutocompleteOption).click();
    cy.get(locators.employee.submitButton).click();
  }

  verifyEmployeeInDirectory(fullName) {
    cy.get(locators.employee.directoryCardHeader).invoke('text').then((text) => {
      const normalizedText = text.replace(/\s+/g, ' ').trim();
      expect(normalizedText).to.eq(fullName);
    });
  }
}

export default EmployeePage;
