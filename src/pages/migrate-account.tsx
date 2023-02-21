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
import { z } from "zod";
import AlreadySignedInPage from "../Components/AlreadySignedInPage";
import InputField from "../Components/InputField";
import Loading from "../Components/Loading";
import LoadingPage from "../Components/LoadingPage";

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
  const text = translations[locale || "en"]?.loginPage;

  /* Session */
  const { data: session } = useSession();

  /* Mutations */
  const migrateAccount = api.migration.createUserForOldApplication.useMutation();

  /* Validation */
  const MigrateUserInputObject = z.object({
    email: z.string().min(1).email(),
    username: z.string().min(1),
    password: z.string().min(6),
  });
  const inputValidation = MigrateUserInputObject.safeParse(newUser);
  const isFieldValid = (field: string) =>
    inputValidation.success ? true : inputValidation.error.issues.find((i) => i.path[0] === field) === undefined;

  /* Handelers */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!inputValidation.success) return;

    e.preventDefault();
    setLoading(true);

    migrateAccount.mutate(newUser, {
      onError() {
        alert(text?.error);
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
  if (!text || session === undefined) return <LoadingPage />;

  if (session?.user) return <AlreadySignedInPage />;

  return (
    <div className="flex flex-col space-y-7 items-center justify-center min-h-full">
      {/* Title */}
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">{"Migrate Account"}</h1>
      <h1 className="mb-4 text-lg font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
        {"Migrate your old application to a new account"}
      </h1>
      {/* Input fields */}
      <form onSubmit={handleSubmit}>
        <div className="grid gap-20 mb-6 md:grid-cols-3">
          {InputField("email", "Email", "text", newUser.email, true, handleUpdateNewUser, isFieldValid("email"))}
          {InputField("username","Username", "text", newUser.username, true, handleUpdateNewUser, isFieldValid("username"))}
          {InputField("password","Password", "password", newUser.password, true, handleUpdateNewUser, isFieldValid("password"))}
        </div>

        {/* Submit button */}
        <div className="flex flex-col space-y-7 items-center justify-center">
          {isLoading ? (
            <Loading />
          ) : (
            <input
              className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800${
                inputValidation.success ? "" : " opacity-50 cursor-not-allowed"
              }`}
              type="submit"
              value={"Migrate"}
              disabled={!inputValidation.success}
            />
          )}
        </div>
      </form>
    </div>
  );
}
