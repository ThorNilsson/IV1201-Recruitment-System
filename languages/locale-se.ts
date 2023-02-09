import { localeType } from "./locale-en";

const locale: localeType = {
  locale: "en",
  name: "Swedish",
  nativeName: "Svenska",
  meta: {
    title: "Lisseborg - Job ansökan",
    description: "Lisseborg nöjespark i sverige",
    content: "Lisseborg - Job ansökan",
  },
  header: {
    companyName: "Lisseborg",
    companySlogan: "Nöje för dig att parkera",
    login: "Logga in",
    register: "Registrera",
  },
  footer: {
    companyName: "Lisseborg",
    companySlogan: "Nöje för dig att parkera",
    copyright: "C 2020 Lisseborg AB",
  },
  homePage: {
    title: "Lisseborg 🦎🏰 Rekryterings System ☝🤓",
    cardTitle: "Starta din ansökan här",
    cardDescription:
      "Är du rätt sommaranställd för oss? - Här kan du ansöka om ett jobb på Lisseborg - Nöjesparken i Sverige",
  },

  /* Authentication */
  loginPage: {
    title: "Logga in",
    description: "Logga in här för att ansöka om ett jobb på Lisseborg",
    username: "Användarnamn",
    password: "Lösenord",
    login: "Logga in",
    error: "Fel användarnamn eller lösenord",
    emptyFields: "Både användarnamn och lösenord måste fyllas i",
  },
  alreadySignedInPage: {
    alreadySignedIn: "Du är redan inloggad",
    signOut: "Logga ut",
    adminPage: "Admin sida",
    myApplicationPage: "Min ansökan",
  },
  registerPage: {
    title: "Registrera",
    description: "Registrera här för att ansöka om ett jobb på Lisseborg",
    username: "Användarnamn",
    password: "Lösenord",
    register: "Registrera",
    error: "Ett fel uppstod, försök igen med ett annat användarnamn",
    emptyFields: "Både användarnamn och lösenord måste fyllas i",
  },

  /* Client */
  myApplicationPage: {
    title: "Min ansökan",
    description: "Här kan du se din ansökan",
    noApplication: "Du har inte ansökt om ett jobb än",
    createApplication: "Skapa ansökan",
  },

  /* Admin */
  applicationsPage: {
    title: "Ansökningar",
    description: "Här kan du se alla mottagna ansökningar",
    filters: "Filter",
    notFound: "Inga ansökningar hittades",
  },
  applicationPage: {
    title: "Ansökan",
    description: "Här kan du redigera ansökan",
    competences: "Kompetenser",
    avaliability: "Tillgänglighet",
    year: "år",
    edit: "Redigera ansökans status",
    updateSyncError:
      "Ett fel uppstod ändring av status, någon annan kanske redan ändrat statusen, uppdatera sidan och försök igen",
    ACCEPTED: "Acceptera ansökan",
    REJECTED: "Avvisa ansökan",
    UNHANDLED: "Återställ ansökan till ohanterad",
  },

  /* Shared */
  app: {
    noAccess: "Du har inte tillgång till denna sida 😒",
    notFound: "Sidan kunde inte hittas 🤷‍♀️",
    back: "Tillbaka",
    save: "Spara",
    cancel: "Avbryt",
    delete: "Ta bort",
    edit: "Redigera",
    create: "Skapa",
    yes: "Ja",
    no: "Nej",
    confirm: "Konfirmera",
    confirmDelete: "Är du säker på att du vill ta bort detta?",
    error: "Ett fel uppstod, försök igen",
  },

  competences: {
    "ticket sales": "Biljettförsäljning",
    lotteries: "Lotteri",
    "roller coaster operation": "Berg- och dalbaneoperatör",
  },
};

export default locale;
