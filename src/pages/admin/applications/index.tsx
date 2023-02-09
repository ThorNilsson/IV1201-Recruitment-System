/**
 * @file index.tsx
 * @description Page for listing and viewing all applications.
 * @author Thor Nilsson
 * @exports Applications - React component.
 */

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { translations } from "../../../../languages/translations";
import Loading from "../../../Components/Loading";
import LoadingPage from "../../../Components/LoadingPage";
import NoAccess from "../../../Components/NoAccess";
import PageBackground from "../../../Components/PageBackground";
import { api } from "../../../utils/api";

/**
 * @returns {React.ReactElement} - React component.
 * @description Page for listing and viewing all applications.
 */
export default function Applications() {
  /* React State */
  const [filter, setFilter] = React.useState<string[]>([]);

  /* Translations */
  const { locale } = useRouter();
  const text = translations[locale || "en"]?.applicationsPage;

  /* Session */
  const { data: session } = useSession();

  /* Queries */
  const { data: applications } = api.admin.getFilterdApplicationPrev.useQuery({ filter: filter, skip: 0, take: 0 });
  const { data: competences } = api.admin.getCompetences.useQuery();

  /* Handlers */
  const handleFilterToggle = (competence: string) => {
    if (filter.includes(competence)) {
      setFilter(filter.filter((item) => item !== competence));
    } else {
      setFilter([...filter, competence]);
    }
  };

  /* Views */
  if (!(text && session)) return <LoadingPage />;

  if (session?.user?.image !== "recruiter") return <NoAccess />;

  return (
    <PageBackground>
      {/* Title */}
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{text.title}</h1>

      <div className="flex flex-row items-top space-x-10">
        {/* Filter manu */}
        <div className="flex flex-col space-y-5">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{text.filters}</h1>
          {!competences ? (
            <Loading />
          ) : (
            competences?.map((competence) => (
              <label key={competence.id} className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value="on"
                  className="sr-only peer"
                  onChange={() => handleFilterToggle(competence.name)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{competence.name}</span>
              </label>
            ))
          )}
        </div>

        {/* List of aplicants */}
        <div className="flex flex-col space-y-1">
          {!applications ? <Loading /> : null}

          {applications?.length === 0 ? (
            <div className="flex space-x-10 content-center px-10 max-w-lg bg-white border border-gray-200 rounded-sm shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{text.notFound}</h5>
            </div>
          ) : (
            applications?.map((application) => (
              <Link
                key={application.id}
                href={`/admin/applications/${application.id}`}
                locale={locale}
                className="flex space-x-10 content-center px-10 max-w-lg bg-white border border-gray-200 rounded-sm shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {application.name} {application.surname}
                </h5>
              </Link>
            ))
          )}
        </div>
      </div>
    </PageBackground>
  );
}
