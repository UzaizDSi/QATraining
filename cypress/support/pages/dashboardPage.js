
class DashboardPage {
    verifyDashboard() {
      cy.get('h6').should("have.text", "Dashboard");
    }
  
    navigateToPIM() {
      cy.get("span").contains("PIM").click();
    }
  
    navigateToDirectory() {
      cy.get("span").contains("Directory").click();
    }
  }
  
  export const dashboardPage = new DashboardPage();
  