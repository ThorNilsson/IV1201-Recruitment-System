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

    cy.url().should("not.match", /.*migrate-account$/); // url shoud now incluide the random id

    cy.get("input[name=username]").type(username);
    cy.get("input[name=password]").type(`${password}{enter}`);

    cy.url().should("include", "/my-application");
  });
  it("successfully invalidates fields in register", () => {
    const name = "Alice";
    const surname = "Doe";
    const email = "Alice@doe.tech";
    const invalidEmail = "Alice.doe.tech";
    const pnr = "1234567890";
    const invalidPnr = "1234567890345";
    const username = "aliceD";
    const password = "alicelovesdogs";

    cy.visit("/register");

    //Checks if it is not possible to register with an invalid email
    cy.get("input[name=name]").type(name);
    cy.get("input[name=surname]").type(surname);
    cy.get("input[name=email]").type(email);
    cy.get("input[name=pnr]").type(pnr);
    cy.get("input[name=username]").type(username);
    cy.get("input[name=password]").type(password);

    cy.get("input[name=submit]").should("be.enabled");

    cy.get("input[name=email]").type("@"); //Adds an @ to the email
    cy.get("input[name=submit]").should("be.disabled");

    cy.get("input[name=email]").clear();
    cy.get("input[name=pnr]").clear();
    cy.get("input[name=email]").type(email);
    cy.get("input[name=pnr]").type(invalidPnr);
    cy.get("input[name=submit]").should("be.disabled");
  });
  it("shows error when an already used email is used on register", () => {
    const name = "Alice";
    const surname = "Doe";
    const usedEmail = "thor.odinson@thunder.vh";
    const Pnr = "1234567890";
    const username = "aliceD";
    const password = "alicelovesdogs";

    cy.visit("/register");

    cy.get("input[name=name]").type(name);
    cy.get("input[name=surname]").type(surname);
    cy.get("input[name=email]").type(usedEmail);
    cy.get("input[name=pnr]").type(Pnr);
    cy.get("input[name=username]").type(username);
    cy.get("input[name=password]").type(`${password}{enter}`);

    cy.contains("❌").should("exist");
  });

  it("successfully lists applications on the admin page", () => {
    const user = "a";
    const pass = "a";

    cy.visit("/");
    cy.get("a[href='/login']").first().click();
    cy.url().should("include", "/login");

    cy.get("input[name=username]").type(user);
    // {enter} causes the form to submit
    cy.get("input[name=password]").type(`${pass}{enter}`);

    cy.contains("Kalle Anka").should("exist");
  });
  it("marks an application as accepted/rejected and it disappears from applications list", () => {
    const user = "a";
    const pass = "a";
    cy.visit("/login");
    cy.get("input[name=username]").type(user);
    // {enter} causes the form to submit
    cy.get("input[name=password]").type(`${pass}{enter}`);
    cy.url().should("include", "/admin/applications");
    cy.visit("/admin/applications/2");

    cy.get("main button").first().should("have.text", "Mark Incomplete").next().should("have.text", "Accept").click();
    cy.contains("ACCEPTED").should("exist");
    cy.visit("/admin/applications");
    cy.contains("Kalle Anka").should("not.exist");
  });
  it.skip("can do a full use case flow", () => {
    // register, apply, login as admin, accept application (+ maybe more)
    // TODO (never)
  });
});

export {};
