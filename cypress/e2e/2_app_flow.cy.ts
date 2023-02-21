describe("The app", () => {
  before(() => {
    // reset and seed the database
    cy.exec("npm run db:reset && npm run db:seed");
  });
  it("successfully login as admin", () => {
    const user = "a";
    const pass = "a";

    cy.visit("/");
    cy.get("a[href='/login']").first().click();
    cy.url().should("include", "/login");

    cy.get("input[name=username]").type(user);
    // {enter} causes the form to submit
    cy.get("input[name=password]").type(`${pass}{enter}`);

    cy.url().should("include", "/admin/applications");
    cy.getCookie("next-auth.session-token").should("exist");
  });
  it("successfully login as applicant", () => {
    const user = "alice";
    const pass = "alice";

    cy.visit("/login");

    cy.get("input[name=username]").type(user);
    cy.get("input[name=password]").type(`${pass}{enter}`);

    cy.url().should("include", "/my-application");
    cy.getCookie("next-auth.session-token").should("exist");
  });
  it("redirect and show error on incorrect credentials", () => {
    const user = "awoiejfoiasjeföosaf";
    const pass = "alikjneejndfoiasdf";

    cy.visit("/login");

    cy.get("input[name=username]").type(user);
    cy.get("input[name=password]").type(`${pass}{enter}`);

    cy.url().should("include", "/api/auth/signin?error=CredentialsSignin");
    cy.getCookie("next-auth.session-token").should("not.exist");

    cy.contains("Sign in failed.").should("exist");
  });
  it("successfully registres as applicant", () => {
    // TODO
  });
  it("successfully migrates applicant old account", () => {
    // TODO
  });
  it("alerts user when fields in register are invalid", () => {
    // TODO
  });
  it("shows error when an already used email is used on register", () => {
    // TODO
  });
  it("successfully applies as applicant with brand new account", () => {
    // TODO
  });
  it("successfully applies as applicant with migrated account", () => {
    // TODO
  });
  it("is unable to click Apply when application is incomplete", () => {
    // TODO
  });
  it("successfully lists applications on the admin page", () => {
    // TODO
  });
  it("marks an application as accepted/rejected and it disappears from applications list", () => {
    // TODO
  });
  it("can do a full use case flow", () => {
    // register, apply, login as admin, accept application (+ maybe more)
    // TODO
  });
});

export {};
