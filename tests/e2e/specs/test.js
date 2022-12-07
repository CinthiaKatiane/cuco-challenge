// https://docs.cypress.io/api/table-of-contents

describe("HomePage Test", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    cy.contains("h1", "Clientes");
  });
});
