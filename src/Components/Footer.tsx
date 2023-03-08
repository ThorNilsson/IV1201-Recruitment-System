import React from "react";
import { useRouter } from "next/router";
import { translations } from "../../languages/translations";
import Loading from "./Loading";

/**
 *
 * @returns {React.ReactElement} - React component.
 * @description Footer component for displaying copyright and links.
 */
function Footer() {
  /* Translations */
  const { locale } = useRouter();
  const text = translations[locale || "en_US"]?.footer;

  /* Views */
  if (text == null) return <Loading />;

  return (
    <footer className="p-4 bg-white shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
      {/* Copyright */}
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © {`${new Date().getFullYear()} `}
        <a href="https://flowbite.com/" className="hover:underline">
          {text.companyName}™
        </a>
        {`. ${text.copyright}`}
      </span>

      {/* Template links */}
      <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <a href="/" className="mr-4 hover:underline md:mr-6 ">
            {text.about}
          </a>
        </li>
        <li>
          <a href="/" className="mr-4 hover:underline md:mr-6">
            {text.privacyPolicy}
          </a>
        </li>
        <li>
          <a href="/" className="mr-4 hover:underline md:mr-6">
            {text.licenceing}
          </a>
        </li>
        <li>
          <a href="/" className="hover:underline">
            {text.contact}
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
