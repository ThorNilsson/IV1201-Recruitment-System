describe("The Home Page", () => {
  it("successfully loads", () => {
    cy.visit("/");
    cy.get("h1").should("contain", "Lisseburg");
  });
});

export {};
