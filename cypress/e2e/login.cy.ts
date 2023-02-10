describe("Login", () => {
  before(() => {
    // reset and seed the database
    cy.exec("npm run db:reset");
  });
  it("succeeds to login as admin", () => {
    const user = "a";
    const pass = "a";

    cy.visit("/");
    cy.get("a[href='/login']").first().click();
    cy.url().should("include", "/login");

    cy.get("input[name=username]").type(user);
    // {enter} causes the form to submit
    cy.get("input[name=password]").type(`${pass}{enter}`);

    cy.url().should("include", "/my-application"); // change to /admin/applications
    cy.getCookie("next-auth.session-token").should("exist");
  });
  it("succeeds to login as applicant", () => {
    const user = "alice";
    const pass = "alice";

    cy.visit("/login");

    cy.get("input[name=username]").type(user);
    cy.get("input[name=password]").type(`${pass}{enter}`);

    cy.url().should("include", "/my-application");
    cy.getCookie("next-auth.session-token").should("exist");
  });
  it("redirects and shows error on incorrect credentials", () => {
    const user = "awoiejfoiasjeföosaf";
    const pass = "alikjneejndfoiasdf";

    cy.visit("/login");

    cy.get("input[name=username]").type(user);
    cy.get("input[name=password]").type(`${pass}{enter}`);

    cy.url().should("include", "/api/auth/signin?error=CredentialsSignin");
    cy.getCookie("next-auth.session-token").should("not.exist");

    cy.contains("Sign in failed.").should("exist");
  });
});
