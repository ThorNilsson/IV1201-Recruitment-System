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
    companyName: "Lisseborg AB",
    companySlogan: "Nöje för dig att parkera",
    copyright: "Alla rättigheter reserverade",
    about: "Om oss",
    privacyPolicy: "Integritetspolicy",
    licenceing: "Licensiering",
    contact: "Kontakt",
  },
  homePage: {
    title: "Lisseborg 🦎🏰 Rekryterings System ☝🤓",
    cardTitle: "Starta din ansökan här",
    cardDescription:
      "Är du rätt sommaranställd för oss? - Här kan du ansöka om ett jobb på Lisseborg - Nöjesparken i Sverige",
  },

  /* Authentication */
  inputFields: {
    username: "Användarnamn",
    password: "Lösenord",
    email: "Email",
    pnr: "Personnummer",
    surname: "Efternamn",
    name: "Förnamn",
  },
  loginPage: {
    title: "Logga in",
    description: "Logga in här för att ansöka om ett jobb på Lisseborg",
    submitBtn: "Logga in",
    migrateBtn: "Gammalt konto? Migrera här!",
    //error: "Fel användarnamn eller lösenord",
    //emptyFields: "Både användarnamn och lösenord måste fyllas i",
  },
  alreadySignedInPage: {
    title: "Du är redan inloggad",
    signOutBtn: "Logga ut",
    adminPageBtn: "Admin sida",
    myApplicationPageBtn: "Min ansökan",
  },
  registerPage: {
    title: "Registrera",
    description: "Registrera här för att ansöka om ett jobb på Lisseborg",
    submitBtn: "Registrera",
    //error: "Ett fel uppstod, försök igen med ett annat användarnamn",
    //emptyFields: "Både användarnamn och lösenord måste fyllas i",
  },
  migrationPage: {
    title: "Överför ditt gamla konto",
    description: "Skriv din tidigare epost och Välj ett nytt användarnamn och lösenord för ditt nya konto",
    submitBtn: "Migrera",
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
    results: "ansökningar",
    previous: "Föregående",
    next: "Nästa",
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
    INCOMPLETE: "Återställ ansökan till ej fullständig",
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

  errors: {
    PARSE_ERROR: "Det gick inte att tolka svaret från servern",
    BAD_REQUEST: "Felaktig begäran",
    INTERNAL_SERVER_ERROR: "Ett fel uppstod på servern",
    UNAUTHORIZED: "Du har inte behörighet att göra denna begäran",
    FORBIDDEN: "Du får inte göra denna begäran",
    NOT_FOUND: "Det gick inte att hitta den begärda resursen",
    METHOD_NOT_SUPPORTED: "Metoden stöds inte",
    TIMEOUT: "Tidsgränsen för begäran uppnådd",
    CONFLICT: "Det finns redan en resurs med samma identitet",
    PRECONDITION_FAILED: "Förhandskrav misslyckades",
    PAYLOAD_TOO_LARGE: "Den begärda resursen är för stor",
    TOO_MANY_REQUESTS: "Du har gjort för många begäran",
    CLIENT_CLOSED_REQUEST: "Den här begäran har stängts av klienten",
  },

  competences: {
    "ticket sales": "Biljettförsäljning",
    lotteries: "Lotteri",
    "roller coaster operation": "Berg- och dalbaneoperatör",
  },
};

export default locale;
