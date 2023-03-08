import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { translations } from "../../../../languages/translations";
import { api } from "../../../utils/api";
import Link from "next/link";
import Loading from "../../../Components/Loading";
import LoadingPage from "../../../Components/LoadingPage";
import NoAccessPage from "../../../Components/NoAccessPage";
import ErrorPage from "../../../Components/ErrorPage";
import { Description, Subtitle, Title } from "../../../Components/Typography";

/**
 * @returns {React.ReactElement} - React component.
 * @description Page for listing and viewing all applications.
 */
export default function Applications() {
  /* Constants */
  const RES_PER_PAGE = 10;

  /* React State */
  const [filter, setFilter] = React.useState<number[]>([]);
  const [page, setPage] = React.useState(0);

  /* Translations */
  const { locale } = useRouter();
  const text = translations[locale || "en_US"]?.applicationsPage;

  /* Session */
  const { data: session } = useSession();
  const isRecruiter = session?.user?.image === "recruiter";

  /* Queries */
  const { data: competences, error: competencesErr } = api.applicant.getCompetences.useQuery({lang: locale || "en_US"}, {
    enabled: isRecruiter,
  });
  const { data: resultCount, error: resultCountErr } = api.admin.getFilterdApplicationPreviewCount.useQuery(
    { filter: filter },
    { enabled: isRecruiter },
  );
  const { data: applications, error: applicationsErr } = api.admin.getFilterdApplicationPrev.useQuery(
    { filter: filter, lang: locale || "en_US", skip: page * RES_PER_PAGE, take: RES_PER_PAGE },
    { enabled: isRecruiter },
  );

  /* Handlers */
  const handlePageIncrement = () =>
    setPage((page) => Math.min(Math.floor((resultCount || 0) / RES_PER_PAGE), page + 1));
  const handlePageDecrement = () => setPage((page) => Math.max(0, page - 1));
  const handleSetPage = (page: number) => setPage(page);
  const handleFilterToggle = (competence_id: number) => {
    filter.includes(competence_id)
      ? setFilter(filter.filter((item) => item !== competence_id))
      : setFilter([...filter, competence_id]);
  };

  /* Views */
  if (session === undefined) return <></>;

  if (session?.user?.image !== "recruiter") return <NoAccessPage />;

  if (!text) return <LoadingPage />;

  if (competencesErr?.data?.code) return <ErrorPage errorCode={competencesErr.data.code} />;
  if (resultCountErr?.data?.code) return <ErrorPage errorCode={resultCountErr.data.code} />;
  if (applicationsErr?.data?.code) return <ErrorPage errorCode={applicationsErr.data.code} />;

  return (
    <div className="flex flex-col space-y-7 items-center min-h-full">
      <Title>{text.title}</Title>
      <Description>{text.description}</Description>

      <div className="flex flex-row items-top space-x-10 ">
        {/* Filter manu */}
        <div className="flex flex-col space-y-5 min-w-screen/3">
          <Subtitle>{text.filters}</Subtitle>
          {!competences ? (
            <Loading />
          ) : (
            competences?.map((competence) => (
              <label key={competence.id} className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value="on"
                  className="sr-only peer"
                  onChange={() => handleFilterToggle(competence.id)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  {competence.competence_name[0]?.name || "?"}
                </span>
              </label>
            ))
          )}
          <Subtitle>{`${resultCount} ${text.results}`}</Subtitle>
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
          {!resultCount || resultCount <= RES_PER_PAGE ? null : (
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
                  {resultCount
                    ? [...Array(Math.ceil(resultCount / RES_PER_PAGE)).keys()].map((pageNr) => (
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
                    disabled={page >= (resultCount || 0) / RES_PER_PAGE - 1}
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
