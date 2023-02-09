/**
 * @file Application.tsx
 * @description Page for viewing a single application.
 * @author Thor Nilsson
 * @exports Application - React component.
 */

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { translations } from "../../../../languages/translations";
import Loading from "../../../Components/Loading";
import NoAccess from "../../../Components/NoAccess";
import { api } from "../../../utils/api";
import { application_status } from "@prisma/client";

/**
 * @returns {React.ReactElement} - React component.
 * @description Page for viewing a single application.
 */
function Application() {
  /* Router */
  const { applicationId } = useRouter().query;

  /* Translations */
  const { locale } = useRouter();
  const applText = translations[locale || "en"]?.applicationPage;
  const compText = translations[locale || "en"]?.competences;
  const appText = translations[locale || "en"]?.app;

  /* Session */
  const { data: session } = useSession();

  /* Queries */
  const { data: application, refetch } = api.admin.getApplication.useQuery(
    { id: parseInt(applicationId as string) },
    { enabled: !!applicationId },
  );

  /* Mutations */
  const updateApplicationStatus = api.admin.updateApplicationStatus.useMutation();

  /* Handlers */
  const handleStatusChange = (status: application_status) => {
    if (!application) return;
    updateApplicationStatus.mutate(
      { id: parseInt(applicationId as string), status, updatedAt: application.updatedAt },
      {
        onSuccess: (ret) => {
          ret.count === 0 ? alert(applText?.updateSyncError) : refetch();
        },
        onError: () => alert(appText?.error),
      },
    );
  };

  /* Views */
  if (!(applText && compText && application)) return <Loading />;

  if (session?.user?.image !== "recruiter") return <NoAccess />;

  return (
    <div className="flex flex-col items-center space-y-5 h-screen white dark:bg-gray-900">
      {/* Aplicant information */}
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
        {applText.title} - {application.name} {application.surname}
      </h1>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {application.status} - {new Date(application.createdAt).toLocaleDateString(locale)}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {application.email} - {application.pnr}
      </p>

      {/* Competence profiles */}
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

      {/* Availabilities */}
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

      {/* Status Buttons */}
      <div className="flex flex-row space-x-5">
        {Object.values(application_status).map((status: application_status) =>
          application.status !== status ? (
            <button
              key={status}
              className="px-4 py-2 font-semibold text-white bg-gray-900 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
              onClick={() => handleStatusChange(status)}
            >
              {applText[status]}
            </button>
          ) : null,
        )}
      </div>
    </div>
  );
}

export default Application;
