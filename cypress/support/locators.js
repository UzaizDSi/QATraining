

export const locators = {
    login: {
      username: "input[name='username']",
      password: "input[name='password']",
      submitButton: "[type='submit']",
    },
    dashboard: {
      welcomeMessage: "p.oxd-userdropdown-name",
      pimButton: "span:contains('PIM')",
      directoryButton: "span:contains('Directory')",
      logoutMenu: "span img",
      logoutLink: "li a:contains('Logout')",
    },
    employee: {
      addEmployeeButton: "button[type='button']:contains('Add')",
      firstNameInput: "input[name='firstName']",
      lastNameInput: "input[name='lastName']",
      usernameInput: 'label:contains("Username")',
      passwordInput: 'label:contains("Password")',
      confirmPasswordInput: 'label:contains("Confirm Password")',
      employeeIdInput: 'label:contains("Employee Id")',
      submitButton: "button[type='submit']",
      employeeList: "li a:contains('Employee List')",
      directorySearchInput: "input[placeholder='Type for hints...']",
      directoryAutocompleteOption: '.oxd-autocomplete-option > span',
      directoryCardHeader: ".orangehrm-directory-card-header",
      toastMessage: ".oxd-text--toast-message",
    },
  };
  