
class EmployeePage {
    addEmployee(firstName, lastName, username, password) {
      cy.get("button[type='button']").contains("Add").click();
      cy.get('h6').should('be.visible');
      cy.get("input[name='firstName']").type(firstName);
      cy.get("input[name='lastName']").type(lastName);
      cy.get("input[type='checkbox']").click({ force: true });
      cy.get('label').contains("Username").parent().siblings('div').find('input').type(username);
      cy.get('label').contains("Password").parent().siblings('div').find('input').type(password);
      cy.get('label').contains("Confirm Password").parent().siblings('div').find('input').type(password);
      cy.get("button[type='submit']").click();
    }
  
    verifyEmployeeSaved(message) {
      cy.get('.oxd-text--toast-message').should("have.text", message);
    }
  
    searchEmployeeById(employeeId) {
      cy.get('label').contains("Employee Id").parent().siblings('div').find('input').type(employeeId);
      cy.get("button[type='submit']").click();
    }
  
    verifyEmployeeName(firstName) {
      cy.get("div[role='cell'] div").contains(firstName).invoke('text').then((text) => {
        const expectedTxt = text.replace(/\s+/g, ' ').trim();
        expect(expectedTxt).to.eq(firstName);
      });
    }
  }
  
  export const employeePage = new EmployeePage();
  