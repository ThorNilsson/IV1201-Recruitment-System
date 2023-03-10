import React from "react";
import router, { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { translations } from "../../languages/translations";
import { api } from "../utils/api";
import LoadingPage from "./LoadingPage";

/**
 * @returns {React.ReactElement} - React component.
 * @description Header component for logo, localisation and session status.
 */
export default function Header() {
  /* Translations */
  const { locale, locales } = useRouter();
  const text = translations[locale || "en_US"]?.header;
  const textSignout = translations[locale || "en_US"]?.alreadySignedInPage;

  /* Querires */
  const { data: session } = useSession();
  const { data: user } = api.auth.getUser.useQuery(undefined, { enabled: session?.user != null });

  /* Handelers */
  const handleLocaleChange = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
  };

  const handleSignout = () => signOut({ callbackUrl: "/" });

  /* Views */
  if (text == null) return <LoadingPage />;

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            {text.companyName}
          </span>
        </a>

        <div className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
          Welcome back {session?.user?.name}!
        </div>

        {/* Links */}
        <div className="w-full block md:w-auto">
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {/* Admin and user role logic */}
            {user?.role?.name === "recruiter" ? (
              <Link
                href='/admin/applications'
                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                {textSignout?.adminPageBtn}
              </Link>
            ) : null}
            {user?.role?.name === "applicant" ? (
              <Link
                href='/my-application'
                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                {textSignout?.myApplicationPageBtn}
              </Link>
            ) : null}

            {/* Sign in and sign out lodgic*/}
            {session?.user ? (
              <button
                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                onClick={handleSignout}
              >
                {textSignout?.signOutBtn}
              </button>
            ) : (
              <>
                <Link
                  href='/login'
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                >
                  {text.login}
                </Link>
                <Link
                  href='/register'
                  className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  {text.register}
                </Link>
              </>
            )}
          </ul>
        </div>

        {/* Languages */}
        <div className="hidden w-full md:block md:w-auto">
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {locales?.map((language) => (
              <li key={language}>
                <button
                  onClick={() => handleLocaleChange(language)}
                  className={`block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:p-0 dark:text-white ${
                    language === locale ? "md:text-blue-700" : null
                  }`}
                  aria-current="page"
                >
                  {language.toUpperCase()}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
