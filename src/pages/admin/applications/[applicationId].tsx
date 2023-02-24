/**
 * @file Application.tsx
 * @description Page for viewing a single application.
 * @author Thor Nilsson
 * @exports Application - React component.
 */

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { application_status } from "@prisma/client";
import { api } from "../../../utils/api";
import { translations } from "../../../../languages/translations";
import NoAccessPage from "../../../Components/NoAccessPage";
import LoadingPage from "../../../Components/LoadingPage";
import ErrorPage from "../../../Components/ErrorPage";
import { Subtitle, Text, Title } from "../../../Components/Typography";
import { Button } from "../../../Components/Buttons";
import Loading from "../../../Components/Loading";

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

  /* Session */
  const { data: session } = useSession();

  /* Queries */
  const { data: application, refetch } = api.admin.getApplication.useQuery(
    { id: parseInt(applicationId as string) },
    { enabled: !!applicationId && session?.user?.image === "recruiter" },
  );

  /* Mutations */
  const updateApplication = api.admin.updateApplicationStatus.useMutation();

  /* Handlers */
  const handleStatusChange = (status: application_status) => {
    if (!application) return;
    updateApplication.mutate(
      { id: parseInt(applicationId as string), status, updatedAt: application.updatedAt },
      { onSuccess: () => refetch() },
    );
  };

  /* Views */
  if (session === undefined) return <></>;

  if (session?.user?.image !== "recruiter") return <NoAccessPage />;

  if (!(applText && compText && application)) return <LoadingPage />;

  if (updateApplication.error?.data?.code) return <ErrorPage errorCode={updateApplication.error?.data?.code} />;

  return (
    <div className="flex flex-col space-y-7 items-center justify-center min-h-full">
      {/* Aplicant information */}
      <Title>{applText.title}</Title>
      <Subtitle>{`${application.name} ${application.surname}`}</Subtitle>
      <Text>{`${application.status} - ${new Date(application.createdAt).toLocaleDateString(locale)}`}</Text>
      <Text>{`${application.email} - ${application.pnr}`}</Text>

      {/* Competence profiles */}
      <Subtitle>{applText.competences}</Subtitle>
      <div className="flex flex-col gap-4 rounded-xl bg-white/10 p-4">
        {application.competence_profile.map((competence_profile) => (
          <Text key={competence_profile.id}>
            {`${compText[competence_profile.competence.name]} ${competence_profile.years_of_experience} ${
              applText.year
            }`}
          </Text>
        ))}
      </div>

      {/* Availabilities */}
      <Subtitle>{applText.avaliability}</Subtitle>
      <div className="flex flex-col gap-4 rounded-xl bg-white/10 p-4">
        {application.availability.map((availability) => (
          <Text key={availability.id}>
            {`${new Date(availability.from_date).toLocaleDateString(locale)} -> ${new Date(
              availability.to_date,
            ).toLocaleDateString(locale)}`}
          </Text>
        ))}
      </div>

      {/* Status Buttons */}
      <div className="flex flex-row space-x-5">
        {updateApplication.isLoading ? (
          <Loading />
        ) : (
          Object.values(application_status).map((status: application_status) =>
            application.status !== status ? (
              <Button key={status} onClick={() => handleStatusChange(status)} disabled={updateApplication.isLoading}>
                {applText[status]}
              </Button>
            ) : null,
          )
        )}
      </div>
    </div>
  );
}

export default Application;
