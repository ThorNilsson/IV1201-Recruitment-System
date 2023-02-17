/**
 * @file index.tsx
 * @description Page for listing and viewing all applications.
 * @author Thor Nilsson
 * @exports Applications - React component.
 */

import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { translations } from "../../../../languages/translations";
import { api } from "../../../utils/api";
import Link from "next/link";
import Loading from "../../../Components/Loading";
import NoAccess from "../../../Components/NoAccess";
import ErrorMessage from "../../../Components/Error";

/**
 * @returns {React.ReactElement} - React component.
 * @description Page for listing and viewing all applications.
 */
export default function Applications() {
  /* Constants */
  const RES_PER_PAGE = 10;

  /* React State */
  const [filter, setFilter] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);

  /* Translations */
  const { locale } = useRouter();
  const text = translations[locale || "en"]?.applicationsPage;
  const compText = translations[locale || "en"]?.competences;

  /* Session */
  const { data: session } = useSession();

  /* Queries */
  const { data: competences, error: competencesErr } = api.admin.getCompetences.useQuery();
  const { data: results, error: resultsErr } = api.admin.getFilterdApplicationPreviewCount.useQuery({ filter: filter });
  const { data: applications, error: applicationsErr } = api.admin.getFilterdApplicationPrev.useQuery(
    { filter: filter, skip: page * RES_PER_PAGE, take: RES_PER_PAGE },
    { enabled: !!results || results === 0 },
  );

  /* Constants */
  const pages = resultCount ? [...Array(Math.ceil(resultCount / applicationsPerPage)).keys()] : [];

  /* Handlers */
  const handlePageIncrement = () => setPage((page) => Math.min(Math.floor((results || 0) / RES_PER_PAGE), page + 1));
  const handlePageDecrement = () => setPage((page) => Math.max(0, page - 1));
  const handleSetPage = (page: number) => setPage(page);
  const handleFilterToggle = (competence: string) => {
    filter.includes(competence)
      ? setFilter(filter.filter((item) => item !== competence))
      : setFilter([...filter, competence]);
  };
  const handleSetPage = (page: number) => setPage(page);
  const handlePageIncrement = () =>
    resultCount ? setPage(Math.min(resultCount / applicationsPerPage, page + 1)) : null;
  const handlePageDecrement = () => (resultCount ? setPage(Math.max(0, page - 1)) : null);

  /* Views */
  if (competencesErr?.data?.code) return <ErrorMessage errorCode={competencesErr.data.code} />;
  if (resultsErr?.data?.code) return <ErrorMessage errorCode={resultsErr.data.code} />;
  if (applicationsErr?.data?.code) return <ErrorMessage errorCode={applicationsErr.data.code} />;
  
  if (!(text && compText) || session === undefined) return <Loading />;

  if (session?.user?.image !== "recruiter") return <NoAccess />;

  return (
    <div className="flex flex-col space-y-7 items-center min-h-full">
      {/* Title */}
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{text.title}</h1>

      <div className="flex flex-row items-top space-x-10 ">
        {/* Filter manu */}
        <div className="flex flex-col space-y-5 min-w-screen/3">
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
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  {compText[competence.name]}
                </span>
              </label>
            ))
          )}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            {results} {text.results}
          </h1>
        </div>

        {/* List of aplicants */}
        <div className="flex flex-col space-y-5 min-w-screen/3">
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

          {/* Pagination */}
          {!results || results <= RES_PER_PAGE ? null : (
            <nav aria-label="Page navigation example">
              <ul className="inline-flex -space-x-px">
                <li>
                  <button
                    onClick={handlePageDecrement}
                    className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    disabled={page === 0}
                  >
                    {text.previous}
                  </button>
                </li>
                <>
                  {results
                    ? [...Array(Math.ceil(results / RES_PER_PAGE)).keys()].map((pageNr) => (
                        <li key={pageNr}>
                          <button
                            onClick={() => handleSetPage(pageNr)}
                            className={
                              pageNr === page
                                ? "px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                : "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            }
                          >
                            {pageNr + 1}
                          </button>
                        </li>
                      ))
                    : null}
                </>
                <li>
                  <button
                    onClick={handlePageIncrement}
                    className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    disabled={page >= (results || 0) / RES_PER_PAGE - 1}
                  >
                    {text.next}
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}
