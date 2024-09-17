
class LoginPage {
    visit() {
      cy.visit('/');
      cy.title().should("eq", "OrangeHRM");
    }
  
    login(username, password) {
      cy.get("input[name='username']").type(username);
      cy.get("input[name='password']").type(password);
      cy.get("[type='submit']").click();
    }
  
    logout() {
      cy.get("span img").click();
      cy.get("li a").contains("Logout").click();
    }
  
    verifyLogout() {
      cy.get("h5").should('be.visible');
    }
  }
  
  export const loginPage = new LoginPage();
  