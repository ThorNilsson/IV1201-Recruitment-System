import React from "react";
import { useRouter } from "next/router";
import { translations } from "../../languages/translations";
import { api } from "../utils/api";
import { signIn, useSession } from "next-auth/react";
import AlreadySignedInPage from "../Components/AlreadySignedInPage";
import LoadingPage from "../Components/LoadingPage";
import InputField from "../Components/InputField";

function Register() {
  /* React State */
  const [newUser, setNewUser] = React.useState({ username: "", password: "", email: "", pnr: "", surname: "",name: ""});
  const handleUpdateNewUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };

  /* Translations */
  const { locale } = useRouter();
  const text = translations[locale || "en"]?.registerPage;

  /* Session */
  const { data: session } = useSession();

  /* Mutations */
  const addUser = api.auth.signup.useMutation();

  /* Handelers */
  const handleSignup = async () => {
    if (newUser.username === "" || newUser.password === "") {
      alert(text?.emptyFields);
      return;
    }
    addUser.mutate(newUser, {
      //username: z.string(), password: z.string(), email: z.string(), pnr: z.string(), surname: z.string()
      onError() {
        alert(text?.error);
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
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">{text?.title}</h1>

      <h1 className="mb-4 text-lg font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
        {text?.description}
      </h1>
      <form>
        <div className="grid gap-20 mb-6 md:grid-cols-2">
        {InputField("name", text?.name, "text", newUser.name, true, handleUpdateNewUser, true)}
        {InputField("surname", text?.surname, "text", newUser.surname, true, handleUpdateNewUser, true)}
        {InputField("email", text?.email, "email", newUser.email, true, handleUpdateNewUser, true)}
        {InputField("pnr", text?.pnr, "text", newUser.pnr, true, handleUpdateNewUser, true)}
        {InputField("username", text?.username, "text", newUser.username, true, handleUpdateNewUser, true)}
        {InputField("password", text?.password, "password", newUser.password, true, handleUpdateNewUser, true)} 
        </div>
      </form>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={handleSignup}
      >
        {text?.register}
      </button>
    </div>
  );
}

export default Register;
