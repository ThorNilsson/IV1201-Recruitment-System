import { localeType } from "../src/types/localeTypes";

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
  },
  applicationpage: {
    title: "Ansökan",
    description: "Här kan du redigera ansökan",
  },
};

export default locale;
