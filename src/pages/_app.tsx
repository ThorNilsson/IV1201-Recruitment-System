import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "../utils/api";
import "../styles/globals.css";
import Head from "next/head";
import Header from "../Components/Header";
import { useRouter } from "next/router";
import { translations } from "../../languages/translations";
import Footer from "../Components/Footer";

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
  /* Translations */
  const { locale } = useRouter();
  const text = translations[locale || "en"]?.meta;

  /* Views */

  return (
    <SessionProvider session={session}>
      <Head>
        <title>{text?.title}</title>
        <meta name={text?.description} content={text?.content} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <Component {...pageProps} />
      </main>

      <Footer />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
