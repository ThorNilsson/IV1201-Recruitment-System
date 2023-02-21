/**
 * @file migrate-account.tsx
 * @description Page for migrating an old applicant account to the new system.
 * @author Thor Nilsson
 * @returns {JSX.Element} - React component.
 */

import React, { FormEvent } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { translations } from "../../languages/translations";
import { api } from "../utils/api";
import AlreadySignedInPage from "../Components/AlreadySignedInPage";
import InputField from "../Components/InputField";
import Loading from "../Components/Loading";
import LoadingPage from "../Components/LoadingPage";
import { migrationValidationObject } from "../validation/validation";
import ErrorPage from "../Components/ErrorPage";
import { SubmitButton } from "../Components/Buttons";
import { Description, Title } from "../Components/Typography";
/**
 * @returns {JSX.Element} - React component.
 * @description Page for migrating an old applicant account to the new system.
 */
export default function MigrateAccount() {
  /* React State */
  const [newUser, setNewUser] = React.useState({ email: "", username: "", password: "" });
  const [isLoading, setLoading] = React.useState(false);
  const handleUpdateNewUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };

  /* Translations */
  const { locale } = useRouter();
  const text = translations[locale || "en"]?.migrationPage;
  const input = translations[locale || "en"]?.inputFields;

  /* Session */
  const { data: session } = useSession();

  /* Mutations */
  const migrateAccount = api.migration.createUserForOldApplication.useMutation();

  /* Validation */
  const validation = migrationValidationObject.safeParse(newUser);
  const isValid = (field: string) =>
    validation.success ? true : validation.error.issues.find((i) => i.path[0] === field) === undefined;

  /* Handelers */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!validation.success) return;

    e.preventDefault();
    setLoading(true);

    migrateAccount.mutate(newUser, {
      onError() {
        //alert(error.message);
        setLoading(false);
      },
      onSuccess: () => {
        signIn("credentials", {
          callbackUrl: "/",
          username: newUser.username,
          password: newUser.password,
        });
      },
    });
  };

  /* Views */
  if (migrateAccount.error?.data?.code) return <ErrorPage errorCode={migrateAccount.error.data.code} />;

  if (!(text && input) || session === undefined) return <LoadingPage />;

  if (session?.user) return <AlreadySignedInPage />;

  return (
    <div className="flex flex-col space-y-7 items-center justify-center min-h-full">
      <Title>{text.title}</Title>
      <Description>{text.description}</Description>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-20 mb-6 md:grid-cols-3">
          {InputField("email", input.email, "text", newUser.email, true, handleUpdateNewUser, isValid)}
          {InputField("username", input.username, "text", newUser.username, true, handleUpdateNewUser, isValid)}
          {InputField("password", input.password, "password", newUser.password, true, handleUpdateNewUser, isValid)}
        </div>
        <SubmitButton label={text.submitBtn} isLoading={isLoading} disabled={!validation.success} />
      </form>
    </div>
  );
}
