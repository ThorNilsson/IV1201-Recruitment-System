const locale = {
  locale: "en",
  name: "English",
  nativeName: "English",
  meta: {
    title: "Lisseburg - Job application",
    description: "Lisseburg amusement park in Sweden",
    content: "Lisseburg - Job application",
  },
  header: {
    companyName: "Lisseburg",
    companySlogan: "Abmusement for you to park",
    login: "Login",
    register: "Register",
  },
  footer: {
    companyName: "Lieesburg",
    companySlogan: "Abmusement for you to park",
    copyright: "C 2020 Lisseborg AB",
  },
  homePage: {
    title: "Lisseburg 🦎🏰 Recruitment System ☝🤓",
    cardTitle: "Start your application here",
    cardDescription:
      "Are you the right summer employee for us? - Here you can apply for a job at Lisseburg - The amusement park in Sweden",
  },

  /* Authentication */
  loginPage: {
    title: "Login",
    description: "Login here to apply for a job at Lisseburg",
    username: "Username",
    password: "Password",
    login: "Login",
    error: "Failed to login, try again",
    emptyFields: "Username or password cannot be empty",
  },
  alreadySignedInPage: {
    alreadySignedIn: "You are already signed in",
    signOut: "Sign out",
    adminPage: "Admin page",
    myApplicationPage: "My application",
  },
  registerPage: {
    title: "Register",
    description: "Register here to apply for a job at Lisseburg",
    username: "Username",
    password: "Password",
    register: "Register",
    error: "Failed to create user, try another username",
    emptyFields: "Username or password cannot be empty",
  },

  /* Client */
  myApplicationPage: {
    title: "My application",
    description: "Here you can see your application",
    noApplication: "You have not applied for a job yet",
    createApplication: "Create application",
  },

  /* Admin */
  applicationsPage: {
    title: "Applications",
    description: "Here you can see all recieved applications",
    filters: "Filters",
  },
  applicationpage: {
    title: "Application",
    description: "Here you can edit the application",
  },

  competences: {
    "ticket sales": "Ticket sales",
    lotteries: "Lotteries",
    "roller coaster operation": "Roller Coaster operation",
  },
};

export type localeType = typeof locale;

export default locale;
