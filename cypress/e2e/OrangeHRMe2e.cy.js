const { faker } = require('@faker-js/faker');

describe('OrangeHRMe2e', () => {
  const adminUser = "Admin";
  const adminPass = "admin123";
  const empData = "employeeData.json";

  function generatePass() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }

  before(() => {
    cy.visit('/');
    cy.title().should("eq", "OrangeHRM");
    cy.get("input[name='username']").type(adminUser);
    cy.get("input[name='password']").type(adminPass);
    cy.get("[type='submit']").click();
  });

  function fillEmployeeForm(firstName, lastName, username, password) {
    cy.get("input[name='firstName']").type(firstName);
    cy.get("input[name='lastName']").type(lastName);
    cy.get("input[type='checkbox']").click({ force: true });
    cy.get('label').contains("Username").parent().siblings('div').find('input').type(username);
    cy.get('label').contains("Password").parent().siblings('div').find('input').type(password);
    cy.get('label').contains("Confirm Password").parent().siblings('div').find('input').type(password);
    cy.get("button[type='submit']").click();
  }

  function verifyToastMessage(message) {
    cy.get('.oxd-text--toast-message').should("have.text", message);
  }

  it('Validation flow', () => {
    cy.get('h6').should("have.text", "Dashboard");
    cy.get("span").contains("PIM").click();
    cy.get("button[type='button']").contains("Add").click();
    cy.get('h6').should('be.visible');

    let employeeID = "";
    cy.get('label').contains("Employee Id").parent().siblings('div').find('input').invoke("val").then((value) => {
      employeeID = value;
    }).then(() => {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const fullName = `${firstName} ${lastName}`;
      const username = `${firstName}${lastName}`;
      const password = generatePass();

      fillEmployeeForm(firstName, lastName, username, password);
      verifyToastMessage("Successfully Saved");
      cy.get('h6').should("contain.text", fullName);

      cy.writeFile(`cypress/fixtures/${empData}`, {
        username,
        password,
        employeeID
      });

      cy.get("li a").contains("Employee List").click();
      cy.get('h6').should('be.visible');

      cy.fixture(empData).then((employee) => {
        cy.get('label').contains("Employee Id").parent().siblings('div').find('input').type(employee.employeeID);
        cy.get("button[type='submit']").click();
        cy.get("div[role='cell'] div").contains(firstName).invoke('text').then((text) => {
          const expectedTxt = text.replace(/\s+/g, ' ').trim();
          expect(expectedTxt).to.eq(firstName);
        });
      });

      cy.get("span").contains("Directory").click();
      cy.get("input[placeholder='Type for hints...']").type(firstName);
      cy.get('.oxd-autocomplete-option > span').click();
      cy.get("button[type='submit']").click();

      cy.get(".orangehrm-directory-card-header").invoke('text').then((text) => {
        const normalizedText = text.replace(/\s+/g, ' ').trim();
        expect(normalizedText).to.eq(fullName);
      });

      cy.get("span img").click();
      cy.get("li a").contains("Logout").click();
      cy.get("h5").should('be.visible');

      cy.fixture(empData).then((employee) => {
        cy.get("input[name='username']").type(employee.username);
        cy.get("input[name='password']").type(employee.password);
        cy.get("[type='submit']").click();
        cy.get("p.oxd-userdropdown-name").should("have.text", fullName);
        cy.get("span").contains("My Info").click();
        cy.get("h6").should('be.visible');
        cy.scrollTo(0, 600);
        cy.get("label").contains("Male").click();
        cy.get("label").contains("Blood Type").parent().siblings("div").click();
        cy.get('.oxd-select-dropdown > :nth-child(6)').click();
        cy.get("button[type='submit']").eq(1).click();
        verifyToastMessage("Successfully Saved");
      });
    });
  });

  after(() => {
    cy.get("span img").click();
    cy.get("li a").contains("Logout").click();
    cy.get("h5").should('be.visible');
    cy.writeFile(`cypress/fixtures/${empData}`, {});
  });
});
