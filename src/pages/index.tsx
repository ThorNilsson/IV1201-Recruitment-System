import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { translations } from "../../languages/translations";
import LoadingPage from "../Components/LoadingPage";
import { Title } from "../Components/Typography";

/**
 * @returns {JSX.Element} - React component.
 * @description Home page for the application with links to the login page and the admin page.
 */
function Home() {
  /* Translations */
  const router = useRouter();
  const text = translations[router.locale || "en_US"]?.homePage;

  /* Queries */
  const { data: session } = useSession();

  /* Redirects */
  if (session?.user?.image === "recruiter") router.push("/admin/applications");
  if (session?.user?.image === "applicant") router.push("my-application");

  /* Views */
  if (session === undefined) return <></>;

  if (!text) return <LoadingPage />;

  return (
    <div className="flex flex-col space-y-7 items-center justify-center min-h-full">
      <Title>{text.title}</Title>
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
