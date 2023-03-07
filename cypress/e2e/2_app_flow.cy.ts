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
    const name = "Alice";
    const surname = "Doe";
    const email = "Alice@doe.tech";
    const pnr = "1234567890";
    const username = "aliceD";
    const password = "alicelovesdogs";

    cy.visit("/register");

    cy.get("input[name=name]").type(name);
    cy.get("input[name=surname]").type(surname);
    cy.get("input[name=email]").type(email);
    cy.get("input[name=pnr]").type(pnr);
    cy.get("input[name=username]").type(username);
    cy.get("input[name=password]").type(`${password}{enter}`);

    cy.url().should("include", "/my-application");

    cy.getCookie("next-auth.session-token").should("exist");
  });
  it("successfully migrates applicant old account", () => {
    const email = "plinnk15.plonkee@thunder.vh";
    const username = "Plinkan15";
    const password = "Plinkan15";

    cy.visit("/auth/migrate-account");
    cy.get("input[name=email]").type(`${email}{enter}`);

    cy.url().should("include", "/auth/migrate-account");

    cy.get("input[name=username]").type(username);
    cy.get("input[name=password]").type(`${password}{enter}`);

    cy.url().should("include", "/my-application");
  });
  it("alerts user when fields in register are invalid", () => {
    const name = "Alice";
    const surname = "Doe";
    const email = "Alice@doe.tech";
    const pnr = "1234567890";
    const username = "aliceD";
    const password = "alicelovesdogs";

    cy.visit("/register");

    cy.get("input[name=name]").type(name);
    cy.get("input[name=surname]").type(surname);
    cy.get("input[name=email]").type(email);
    cy.get("input[name=pnr]").type(pnr);
    cy.get("input[name=username]").type(username);
    cy.get("input[name=password]").type(`${password}{enter}`);

    cy.url().should("include", "/my-application");

    cy.getCookie("next-auth.session-token").should("not-exist");
    cy.contains("The request failed due to preconditions").should("exist");
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
