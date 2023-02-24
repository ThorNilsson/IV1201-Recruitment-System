import React, { FormEvent } from "react";
import { useRouter } from "next/router";
import { translations } from "../../languages/translations";
import { signIn, useSession } from "next-auth/react";
import AlreadySignedInPage from "../Components/AlreadySignedInPage";
import LoadingPage from "../Components/LoadingPage";
import InputField from "../Components/InputField";
import { loginValidationObject } from "../validation/validation";
import { LinkButton, SubmitButton } from "../Components/Buttons";
import { Description, Title } from "../Components/Typography";

function Login() {
  /* React State */
  const [newUser, setNewUser] = React.useState({ username: "", password: "" });
  const [isLoading, setLoading] = React.useState(false);
  const handleUpdateNewUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };

  /* Translations */
  const { locale } = useRouter();
  const text = translations[locale || "en"]?.loginPage;
  const input = translations[locale || "en"]?.inputFields;

  /* Session */
  const { data: session } = useSession();

  /* Validation */
  const validation = loginValidationObject.safeParse(newUser);
  const isValid = (field: string) =>
    validation.success ? true : validation.error.issues.find((i) => i.path[0] === field) === undefined;

  /* Handelers */
  const handleSignin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validation.success) return;

    signIn("credentials", {
      callbackUrl: "/",
      username: newUser.username,
      password: newUser.password,
    });
    setLoading(true);
  };

  /* Views */
  if (session === undefined) return <></>;

  if (!(text && input)) return <LoadingPage />;

  if (session?.user) return <AlreadySignedInPage />;

  return (
    <div className="flex flex-col space-y-7 items-center justify-center min-h-full">
      <Title>{text.title}</Title>
      <Description>{text.description}</Description>

      <form onSubmit={handleSignin}>
        <div className="grid gap-20 mb-6 md:grid-cols-2">
          {InputField("username", input.username, "text", newUser.username, true, handleUpdateNewUser, isValid)}
          {InputField("password", input.password, "password", newUser.password, true, handleUpdateNewUser, isValid)}
        </div>
        <SubmitButton label={text.submitBtn} isLoading={isLoading} disabled={!validation.success} />
      </form>

      <LinkButton href="/migrate-account">{text.migrateBtn}</LinkButton>
    </div>
  );
}

export default Login;
