import { faker } from '@faker-js/faker';
import LoginPage from '../support/pages/LoginPage';
import DashboardPage from '../support/pages/DashboardPage';
import EmployeePage from '../support/pages/EmployeePage';

describe('OrangeHRMe2e', () => {
  const loginPage = new LoginPage();
  const dashboardPage = new DashboardPage();
  const employeePage = new EmployeePage();

  const adminUser = "Admin";
  const adminPass = "admin123";
  const empData = "employeeData.json";

  const generatePass = (length = 12) => 
    Array.from({ length }, () => 
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+'.charAt(Math.floor(Math.random() * 64))
    ).join('');

  before(() => {
    loginPage.visit();
    loginPage.verifyTitle();
    loginPage.login(adminUser, adminPass);
  });

  it('Validation flow', () => {
    dashboardPage.verifyDashboard();
    dashboardPage.navigateToPIM();
    employeePage.clickAddEmployee();

    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const fullName = `${firstName} ${lastName}`;
    const username = `${firstName}${lastName}`;
    const password = generatePass();

    employeePage.getEmployeeId().then((employeeID) => {
      employeePage.fillEmployeeForm(firstName, lastName, username, password);
      cy.writeFile(`cypress/fixtures/${empData}`, {
        username,
        password,
        employeeID
      });

      dashboardPage.navigateToEmployeeList();
      cy.fixture(empData).then((employee) => {
        employeePage.searchEmployeeById(employee.employeeID);
        cy.get('div[role="cell"] div').contains(firstName).should('exist');
      });

      dashboardPage.navigateToDirectory();
      employeePage.selectEmployeeFromDirectory(firstName);
      employeePage.verifyEmployeeInDirectory(fullName);

      dashboardPage.logout();
    });
  });

  after(() => {
    cy.fixture(empData).then((employee) => {
      loginPage.login(employee.username, employee.password);
      loginPage.verifyLoginSuccess(`${employee.firstName} ${employee.lastName}`);
      cy.writeFile(`cypress/fixtures/${empData}`, {}); // Clean up fixture
    });

    dashboardPage.logout();
  });
});
