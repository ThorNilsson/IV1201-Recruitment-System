import { useRouter } from "next/router";
import React from "react";
import { translations } from "../../../../languages/translations";
import Loading from "../../../app/Components/Loading";

function Application() {
  /* Router */
  const { applicationId } = useRouter().query;

  /* Translations */
  const { locale } = useRouter();
  const text = translations[locale || "en"]?.applicationpage;

  /* Dummy Data */
  const application = { firstName: "Ola", lastName: "Salo", status: "Pending", date: "2021-05-01", id: 1 };

  /* Views */
  if (text == null) return <Loading />;

  return (
    <div className="flex flex-col items-center space-y-5 h-screen white dark:bg-gray-900">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
        {text.title} {applicationId}{" "}
      </h1>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {application.status} - {application.date}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {application.status} - {application.date}
      </p>
      <button className="px-4 py-2 font-semibold text-white bg-gray-900 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75">
        test
      </button>
    </div>
  );
}

export default Application;
