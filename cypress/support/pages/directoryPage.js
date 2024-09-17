
class DirectoryPage {
    searchEmployeeByName(name) {
      cy.get("input[placeholder='Type for hints...']").type(name);
      cy.get('.oxd-autocomplete-option > span').click();
      cy.get("button[type='submit']").click();
    }
  
    verifyEmployeeInDirectory(fullName) {
      cy.get(".orangehrm-directory-card-header").invoke('text').then((text) => {
        const normalizedText = text.replace(/\s+/g, ' ').trim();
        expect(normalizedText).to.eq(fullName);
      });
    }
  }
  
  export const directoryPage = new DirectoryPage();
  