// https://docs.cypress.io/api/table-of-contents

describe("Add Client Test", () => {
  it("Visits the Add Page url", () => {
    cy.visit("/add");
    cy.contains("h1", "Novo Cliente");

    cy.intercept('POST', '/clients').as('addClient')

    cy.get("#input-name").should('have.value', '');
    cy.get("#input-name").type('Nome Teste');

    cy.get("#input-cpf").should('have.value', '');
    cy.get("#input-cpf").type('111.111.111-11');

    cy.get("#input-birthdate").should('have.value', '');
    cy.get("#input-birthdate").type('1111-11-11');

    cy.get("#input-phone").should('have.value', '');
    cy.get("#input-phone").type('(11) 11111-1111');

    cy.get("#save").click();

    cy.wait('@addClient').its('response.statusCode').should('equal', 201)
  });
});


describe("Edit Client Test", () => {
  it("Visits the Edit Page url", () => {
    cy.visit("/edit/2a53a14");

    cy.get("#input-name").should('have.value', 'Sr. Alessandro Luis Santiago');
    cy.get("#input-cpf").should('have.value', '032.174.939-15');
    cy.get("#input-birthdate").should('have.value', '1977-09-23');
    cy.get("#input-phone").should('have.value', '(98) 95843-7346');
  });
});
