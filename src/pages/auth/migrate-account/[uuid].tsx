/**
 * @file migrate-account.tsx
 * @description Page for migrating an old applicant account to the new system.
 * @author Thor Nilsson
 * @returns {JSX.Element} - React component.
 */

import React, { FormEvent } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { translations } from "../../../../languages/translations";
import { api } from "../../../utils/api";
import AlreadySignedInPage from "../../../Components/AlreadySignedInPage";
import InputField from "../../../Components/InputField";
import { loginValidationObject, migrationValidationObject } from "../../../validation/validation";
import ErrorPage from "../../../Components/ErrorPage";
import { SubmitButton } from "../../../Components/Buttons";
import { Description, Title } from "../../../Components/Typography";
import Z, { string } from "zod";
import LoadingPage from "../../../Components/LoadingPage";
/**
 * @returns {JSX.Element} - React component.
 * @description Page for migrating an old applicant account to the new system.
 */
export default function MigrateAccount() {
  /* React State */
  const [newUser, setNewUser] = React.useState({ username: "", password: "" });
  const handleUpdateNewUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };

  /* Translations */
  const router = useRouter();
  const { locale } = router;
  const text = translations[locale || "en_US"]?.migrationPage;
  const input = translations[locale || "en_US"]?.inputFields;

  /* Session */
  const { data: session } = useSession();

  /* Queries */
  const application = api.migration.getAplicationByURL.useQuery(
    { URL: router.query.uuid as string },
    { enabled: !!router.query.uuid },
  );
  const user = application.data;

  /* Mutations */
  const migrateAccount = api.migration.createUserForOldApplication.useMutation();

  /* Validation */
  const validation = loginValidationObject.safeParse(newUser);
  const isValid = (field: string) =>
    validation.success ? true : validation.error.issues.find((i) => i.path[0] === field) === undefined;

  /* Handelers */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!validation.success) return;
    e.preventDefault();

    migrateAccount.mutate(
      { ...newUser, URL: router.query.uuid as string },
      {
        onSuccess: () => {
          signIn("credentials", {
            callbackUrl: "/",
            username: newUser.username,
            password: newUser.password,
          });
        },
      },
    );
  };

  /* Views */
  if (!(text && input) || session === undefined) return <></>;

  if (session?.user) return <AlreadySignedInPage />;

  if (application.isFetching) return <LoadingPage />;

  if (application.error?.data?.code) return <ErrorPage errorCode={application.error.data.code} />;
  if (migrateAccount.error?.data?.code) return <ErrorPage errorCode={migrateAccount.error.data.code} />;

  return (
    <div className="flex flex-col space-y-7 items-center justify-center min-h-full">
      <Title>{text.title}</Title>
      <Description>
        {text.description} {user?.name} {user?.email} {user?.id} {user?.surname}
      </Description>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-20 mb-6 md:grid-cols-3">
          {InputField("username", input.username, "text", newUser.username, true, handleUpdateNewUser, isValid)}
          {InputField("password", input.password, "password", newUser.password, true, handleUpdateNewUser, isValid)}
        </div>
        <SubmitButton label={text.submitBtn} isLoading={migrateAccount.isLoading} disabled={!validation.success} />
      </form>
    </div>
  );
}
