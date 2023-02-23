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
    companyName: "Lieesburg  AB",
    companySlogan: "Abmusement for you to park",
    copyright: "All Rights Reserved.",
    about: "About",
    privacyPolicy: "Privacy policy",
    licenceing: "Licencing",
    contact: "Contact",
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
    email: "Email",
    pnr: "Personal number",
    surname: "Surname",
    name: "Name",
    register: "Register",
    error: "Failed to create user, try another username",
    emptyFields: "Username or password cannot be empty",
  },

  /* Client */
  myApplicationPage: {
    title: "My application",
    incompletePrompt: "Fill in competences & available working times and then hit Send to send your applicaiton",
    applicationStatusKey: "Status:",
    applicationStatus: {
      /* what to display to the user */
      ACCEPTED: "Accepted 😊",
      REJECTED: "Rejected 😭",
      UNHANDLED: "Waiting for recruiter response",
      INCOMPLETE: "Incomplete ⚠",
    },
    competences: "Competences",
    competence: "Competence",
    years: "Years of experience",
    availability: "Available periods for work",
    from: "From",
    to: "To",
    delete: "Delete",
    add: "+ Add",
    edit: "Edit",
    sumbit: "Send",
  },

  /* Admin */
  applicationsPage: {
    title: "Applications",
    description: "Here you can see all recieved applications",
    filters: "Filters",
    notFound: "No applications found",
    results: "applications",
    previous: "Previous",
    next: "Next",
  },
  applicationPage: {
    title: "Application",
    description: "Here you can edit the application",
    competences: "Competences",
    avaliability: "Avaliability",
    year: "year",
    edit: "Edit application status",
    updateSyncError:
      "Failed to update application status, someone else might have updated it before you, reload the page to get the latest version",
    ACCEPTED: "Accept",
    REJECTED: "Reject",
    UNHANDLED: "Mark Unhandled",
    INCOMPLETE: "Mark Incomplete",
  },

  /* Shared */
  app: {
    noAccess: "You do not have access to this page 🤔",
    notFound: "Page not found 🤨",
    back: "Back",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    create: "Create",
    yes: "Yes",
    no: "No",
    confirm: "Confirm",
    confirmDelete: "Are you sure you want to delete this?",
    error: "Something went wrong, try again later",
  },

  errors: {
    PARSE_ERROR: "The request body could not be parsed",
    BAD_REQUEST: "The request was malformed",
    INTERNAL_SERVER_ERROR: "Internal server error",
    UNAUTHORIZED: "The request was not authorized",
    FORBIDDEN: "The request was not allowed",
    NOT_FOUND: "The requested resource was not found",
    METHOD_NOT_SUPPORTED: "This method is not supported",
    TIMEOUT: "The request timed out",
    CONFLICT: "The request conflicted with another request",
    PRECONDITION_FAILED: "The request failed due to preconditions",
    PAYLOAD_TOO_LARGE: "The request payload is too large",
    TOO_MANY_REQUESTS: "Too many requests",
    CLIENT_CLOSED_REQUEST: "Client closed request",
  },

  competences: {
    "ticket sales": "Ticket sales",
    lotteries: "Lotteries",
    "roller coaster operation": "Roller Coaster operation",
  } as Record<string, string>,
};

export type localeType = typeof locale;

export default locale;
