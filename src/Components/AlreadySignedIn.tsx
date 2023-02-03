import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { translations } from "../../languages/translations";
import Loading from "./Loading";
import { api } from "../utils/api";

function AlreadySignedIn() {
  /* Translations */
  const { locale } = useRouter();
  const text = translations[locale || "en"]?.alreadySignedInPage;

  /* Querys */
  const { data: session } = useSession();
  const { data: user } = api.auth.getUser.useQuery(undefined, { enabled: session?.user != null });

  /* Handlers */
  const handleSignout = () => signOut();

  /* Views */
  if (text == null) return <Loading />;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900/90 to-[#15162c]">
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        {user?.username}! {text.alreadySignedIn}
      </h1>
      <div className="flex space-x-5 m-10">
        <button
          onClick={handleSignout}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {text.signOut}
        </button>
        {user?.role?.name === "recruiter" ? (
          <Link
            href="/admin/applications"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {text.adminPage}
          </Link>
        ) : (
          <Link
            href="/my-application"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {text.myApplicationPage}
          </Link>
        )}
      </div>
    </div>
  );
}

export default AlreadySignedIn;
