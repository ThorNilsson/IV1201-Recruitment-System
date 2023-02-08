import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { translations } from "../../../../languages/translations";
import Loading from "../../../Components/Loading";
import NoAccess from "../../../Components/NoAccess";
import { api } from "../../../utils/api";

function Application() {
  /* Router */
  const { applicationId } = useRouter().query;

  /* Translations */
  const { locale } = useRouter();
  const applText = translations[locale || "en"]?.applicationPage;
  const compText = translations[locale || "en"]?.competences;

  /* Session */
  const { data: session } = useSession();

  /* Queries */
  const { data: application } = api.admin.getApplication.useQuery({ id: parseInt(applicationId as string) });

  /* Views */
  if (!(applText && compText && application)) return <Loading />;

  if (session?.user?.image !== "recruiter") return <NoAccess />;

  return (
    <div className="flex flex-col items-center space-y-5 h-screen white dark:bg-gray-900">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
        {applText.title} - {application.name} {application.surname}
      </h1>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {application.status} - {new Date(application.createdAt).toLocaleDateString(locale)}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {application.email} - {application.pnr}
      </p>

      <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{applText.competences}</div>
      <div className="flex flex-col gap-4 rounded-xl bg-white/10 p-4">
        {application.competence_profile.map((competence_profile) => (
          <div key={competence_profile.id} className="font-normal text-gray-700 dark:text-gray-400">
            {`${compText[competence_profile.competence.name]} ${competence_profile.years_of_experience} ${
              applText.year
            }`}
          </div>
        ))}
      </div>

      <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{applText.avaliability}</div>
      <div className="flex flex-col gap-4 rounded-xl bg-white/10 p-4">
        {application.availability.map((availability) => (
          <div key={availability.id} className="font-normal text-gray-700 dark:text-gray-400">
            {`${new Date(availability.from_date).toLocaleDateString(locale)} -> ${new Date(
              availability.to_date,
            ).toLocaleDateString(locale)}`}
          </div>
        ))}
      </div>
      <button className="px-4 py-2 font-semibold text-white bg-gray-900 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75">
        {applText.edit}
      </button>
    </div>
  );
}

export default Application;
