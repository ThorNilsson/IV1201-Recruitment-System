import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { translations } from "../../languages/translations";
import LoadingPage from "../Components/LoadingPage";

function Home() {
  /* Translations */
  const router = useRouter();
  const text = translations[router.locale || "en"]?.homePage;

  /* Queries */
  const { data: session } = useSession();

  console.log(session);

  /* Redirects */
  if (session?.user?.image === "recruiter") router.push("/admin/applications");
  if (session?.user?.image === "applicant") router.push("my-application");

  /* Views */
  if (!text || session === undefined) return <LoadingPage />;

  return (
    <div className="flex flex-col space-y-7 items-center justify-center min-h-full">
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">{text.title}</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
        <Link
          className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
          href={
            !session?.user ? "/login" : session.user.image === "recruiter" ? "admin/applications" : "/my-application"
          }
        >
          <h3 className="text-2xl font-bold">{text.cardTitle} →</h3>
          <div className="text-lg">{text.cardDescription}</div>
        </Link>
      </div>
    </div>
  );
}

export default Home;
