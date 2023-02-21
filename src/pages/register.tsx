import React from "react";
import { useRouter } from "next/router";
import { translations } from "../../languages/translations";
import { api } from "../utils/api";
import { signIn, useSession } from "next-auth/react";
import AlreadySignedInPage from "../Components/AlreadySignedInPage";
import LoadingPage from "../Components/LoadingPage";
import InputField from "../Components/InputField";
import { signupValidationObject } from "../validation/validation";
import ErrorPage from "../Components/ErrorPage";
import { Button, SubmitButton } from "../Components/Buttons";
import { Description, Title } from "../Components/Typography";

function Register() {
  /* React State */
  const [isLoading, setLoading] = React.useState(false);
  const [newUser, setNewUser] = React.useState({
    username: "",
    password: "",
    email: "",
    pnr: "",
    surname: "",
    name: "",
  });
  const handleUpdateNewUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };

  /* Translations */
  const { locale } = useRouter();
  const text = translations[locale || "en"]?.registerPage;
  const input = translations[locale || "en"]?.inputFields;

  /* Session */
  const { data: session } = useSession();

  /* Mutations */
  const addUser = api.auth.signup.useMutation();

  /* Validation */
  const validation = signupValidationObject.safeParse(newUser);
  const isValid = (field: string) =>
    validation.success ? true : validation.error.issues.find((i) => i.path[0] === field) === undefined;

  /* Handelers */
  const handleSignup = async () => {
    if (!validation.success) return;
    setLoading(true);
    addUser.mutate(newUser, {
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
  if (addUser.error?.data?.code) return <ErrorPage errorCode={addUser.error.data.code} />;

  if (!(text && input) || session === undefined) return <LoadingPage />;

  if (session?.user) return <AlreadySignedInPage />;

  return (
    <div className="flex flex-col space-y-7 items-center justify-center min-h-full">
      <Title> {text.title} </Title>
      <Description> {text.description} </Description>

      <form onSubmit={handleSignup}>
        <div className="grid gap-20 mb-6 md:grid-cols-2">
          {InputField("name", input.name, "text", newUser.name, true, handleUpdateNewUser, isValid)}
          {InputField("surname", input.surname, "text", newUser.surname, true, handleUpdateNewUser, isValid)}
          {InputField("email", input.email, "email", newUser.email, true, handleUpdateNewUser, isValid)}
          {InputField("pnr", input.pnr, "text", newUser.pnr, true, handleUpdateNewUser, isValid)}
          {InputField("username", input.username, "text", newUser.username, true, handleUpdateNewUser, isValid)}
          {InputField("password", input.password, "password", newUser.password, true, handleUpdateNewUser, isValid)}
        </div>
        <SubmitButton label={text.submitBtn} isLoading={isLoading} disabled={!validation.success} />
      </form>
    </div>
  );
}

export default Register;
