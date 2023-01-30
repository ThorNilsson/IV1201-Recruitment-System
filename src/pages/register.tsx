import React from "react";
import { useRouter } from "next/router";
import { translations } from "../../languages/translations";
import Loading from "../Components/Loading";
import { api } from "../utils/api";
import { signIn, useSession } from "next-auth/react";
import AlreadySignedIn from "../Components/AlreadySignedIn";

function Register() {
  /* React State */
  const [newUser, setNewUser] = React.useState({ username: "", password: "" });
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
      onError() {
        alert(text?.error);
      },
      onSuccess: () => {
        signIn("credentials", {
          callbackUrl: "/my-application",
          username: newUser.username,
          password: newUser.password,
        });
      },
    });
  };

  /* Views */
  if (text == null) return <Loading />;

  if (session?.user) return <AlreadySignedIn />;

  return (
    <div className="flex min-h-screen flex-col space-y-5 items-center justify-center bg-gradient-to-b from-gray-900/90 to-[#15162c]">
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">{text.title}</h1>

      <h1 className="mb-4 text-lg font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
        {text.description}
      </h1>
      <form>
        <div className="grid gap-20 mb-6 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{text.username}</label>
            <input
              type="text"
              name="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Username"
              required
              onInput={handleUpdateNewUser}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{text.password} </label>
            <input
              type="password"
              name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Password"
              required
              onInput={handleUpdateNewUser}
            />
          </div>
        </div>
      </form>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={handleSignup}
      >
        {text.register}
      </button>
    </div>
  );
}

export default Register;
