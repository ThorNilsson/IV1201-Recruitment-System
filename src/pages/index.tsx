import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { translations } from "../../languages/translations";
import Loading from "../app/Components/Loading";

function Home() {
  /* Translations */
  const { locale } = useRouter();
  const text = translations[locale || "en"]?.homePage;

  /* Queries */
  const { data: session } = useSession();

  /* Views */
  if (text == null) return <Loading />;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900/90 to-[#15162c]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">{text.title}</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href={session?.user ? "/my-application" : "/login"}
          >
            <h3 className="text-2xl font-bold">{text.cardTitle} →</h3>
            <div className="text-lg">{text.cardDescription}</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
