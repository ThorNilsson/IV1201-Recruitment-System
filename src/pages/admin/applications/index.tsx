import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { translations } from "../../../../languages/translations";
import Loading from "../../../Components/Loading";
import { api } from "../../../utils/api";

export default function Applications() {
  /* Translations */
  const { locale } = useRouter();
  const text = translations[locale || "en"]?.applicationsPage;

  /* Queries */
  const { data: applications } = api.admin.getFilterdApplicationPrev.useQuery({ filter: "test" });
  const { data: competences } = api.admin.getCompetences.useQuery();

  console.log(applications);

  const skills = ["Accounting", "Administration", "Advertising", "Agriculture"];

  /* Views */
  if (text == null) return <Loading />;

  return (
    <div className="flex flex-col items-center space-y-5 h-screen white dark:bg-gray-900">
      {/* Title */}
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{text.title}</h1>

      <div className="flex flex-row items-center space-x-5">
        {/* Filter manu */}
        <div className="flex flex-col space-y-5">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{text.filters}</h1>
          {skills.map((skill) => (
            <label key={skill} className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="on" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{skill}</span>
            </label>
          ))}
        </div>

        {/* List of aplicants */}
        <div className="flex flex-col space-y-1">
          {applications?.map((application) => (
            <Link
              key={application.id}
              href={`/admin/applications/${application.id}`}
              locale={locale}
              className="flex space-x-10 content-center px-10 max-w-lg bg-white border border-gray-200 rounded-sm shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {application.name} {application.surname}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {
                  //{application.competence_profile[0]?.status} - {application.competence_profile[0]?.createdAt}
                }
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
