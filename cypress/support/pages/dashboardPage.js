
import { locators } from '../locators';

class DashboardPage {
  verifyDashboard() {
    cy.get('h6').should('have.text', 'Dashboard');
  }

  navigateToPIM() {
    cy.get(locators.dashboard.pimButton).click();
  }

  navigateToDirectory() {
    cy.get(locators.dashboard.directoryButton).click();
  }

  navigateToEmployeeList() {
    cy.get(locators.employee.employeeList).click();
  }

  logout() {
    cy.get(locators.dashboard.logoutMenu).click();
    cy.get(locators.dashboard.logoutLink).click();
  }
}

export default DashboardPage;
