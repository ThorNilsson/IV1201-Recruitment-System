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
import PageBackground from "../Components/PageBackground";

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
  /* Translations */
  const { locale } = useRouter();
  const text = translations[locale || "en_US"]?.meta;

  /* Views */
  return (
    <SessionProvider session={session}>
      <div className="h-screen flex flex-col">
        <Head>
          <title>{text?.title}</title>
          <meta name={text?.description} content={text?.content} />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header />

        <main className="flex flex-1 overflow-auto">
          <PageBackground>
            <Component {...pageProps} />
          </PageBackground>
        </main>

        <Footer />
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
