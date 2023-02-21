describe("The site successfully loads", () => {
  it("The Home Page", () => {
    cy.visit("/");
    cy.get("h1").should("contain", "Lisseburg");
  });
  it("redirects or shows error when accessing a page without proper login", () => {
    // TODO
  });
});

export {};
