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
import { migrationRequestValidationObject, migrationValidationObject } from "../../../validation/validation";
import ErrorPage from "../../../Components/ErrorPage";
import { SubmitButton } from "../../../Components/Buttons";
import { Description, Title } from "../../../Components/Typography";
import { router } from "@trpc/server";
/**
 * @returns {JSX.Element} - React component.
 * @description Page for migrating an old applicant account to the new system.
 */
export default function MigrateAccount() {
  /* React State */
  const [newUser, setNewUser] = React.useState({ email: "" });
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

  /* Mutations */
  const migrationRequest = api.migration.migrationRequest.useMutation();

  /* Validation */
  const validation = migrationRequestValidationObject.safeParse(newUser);
  const isValid = (field: string) =>
    validation.success ? true : validation.error.issues.find((i) => i.path[0] === field) === undefined;

  /* Handelers */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!validation.success) return;
    e.preventDefault();

    migrationRequest.mutate(newUser, {
      onSuccess: (res) => {
        router.push(`/auth/migrate-account/${res}`);
      },
    });
  };

  /* Views */
  if (!(text && input) || session === undefined) return <></>;

  if (session?.user) return <AlreadySignedInPage />;

  if (migrationRequest.error?.data?.code) return <ErrorPage errorCode={migrationRequest.error.data.code} />;

  return (
    <div className="flex flex-col space-y-7 items-center justify-center min-h-full">
      <Title>{text.title}</Title>
      <Description>{text.description}</Description>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-20 mb-6 md:grid-cols-1">
          {InputField("email", input.email, "text", newUser.email, true, handleUpdateNewUser, isValid)}
        </div>
        <SubmitButton label={text.submitBtn} isLoading={migrationRequest.isLoading} disabled={!validation.success} />
      </form>
    </div>
  );
}
