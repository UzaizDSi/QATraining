
import { loginPage } from '../support/pages/loginPage';
import { dashboardPage } from '../support/pages/dashboardPage';
import { employeePage } from '../support/pages/employeePage';
import { directoryPage } from '../support/pages/directoryPage';
const { faker } = require('@faker-js/faker');

describe('OrangeHRMe2e', () => {
  const adminUser = "Admin";
  const adminPass = "admin123";
  const empData = "employeeData.json";

  const generatePass = (length = 12) => 
    Array.from({ length }, () => 
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+'.charAt(Math.floor(Math.random() * 64))
    ).join('');

  before(() => {
    loginPage.visit();
    loginPage.login(adminUser, adminPass);
  });

  it('Validation flow', () => {
    dashboardPage.verifyDashboard();
    dashboardPage.navigateToPIM();

    let employeeID = "";
    cy.get('label').contains("Employee Id").parent().siblings('div').find('input').invoke("val").then((value) => {
      employeeID = value;
    }).then(() => {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const fullName = `${firstName} ${lastName}`;
      const username = `${firstName}${lastName}`;
      const password = generatePass();

      employeePage.addEmployee(firstName, lastName, username, password);
      employeePage.verifyEmployeeSaved("Successfully Saved");
      cy.get('h6').should("contain.text", fullName);

      cy.writeFile(`cypress/fixtures/${empData}`, {
        username,
        password,
        employeeID
      });

      cy.get("li a").contains("Employee List").click();
      cy.get('h6').should('be.visible');

      cy.fixture(empData).then((employee) => {
        employeePage.searchEmployeeById(employee.employeeID);
        employeePage.verifyEmployeeName(firstName);
      });

      dashboardPage.navigateToDirectory();
      directoryPage.searchEmployeeByName(firstName);
      directoryPage.verifyEmployeeInDirectory(fullName);

      loginPage.logout();
      loginPage.verifyLogout();

      cy.fixture(empData).then((employee) => {
        loginPage.login(employee.username, employee.password);
        cy.get("p.oxd-userdropdown-name").should("have.text", fullName);
        cy.get("span").contains("My Info").click();
        cy.get("h6").should('be.visible');
        cy.scrollTo(0, 600);
        cy.get("label").contains("Male").click();
        cy.get("label").contains("Blood Type").parent().siblings("div").click();
        cy.get('.oxd-select-dropdown > :nth-child(6)').click();
        cy.get("button[type='submit']").eq(1).click();
        employeePage.verifyEmployeeSaved("Successfully Saved");
      });
    });
  });

  after(() => {
    loginPage.logout();
    loginPage.verifyLogout();
    cy.writeFile(`cypress/fixtures/${empData}`, {});
  });
});
