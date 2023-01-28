import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { translations } from "../../languages/translations";
import Loading from "../app/Components/Loading";
import Login from "./login";

export default function MyApplication() {
	/* Translations */
	const { locale } = useRouter();
	const text = translations[locale || "en"]?.myApplicationPage;

	/* Session */
	const { data: session } = useSession();

	/* Views */
	if (!text) return <Loading />;

	if (!session?.user) <Login />;

	return (
		<div className="flex min-h-screen flex-col space-y-5 items-center justify-center bg-gradient-to-b from-gray-900/90 to-[#15162c]">
			<h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">{text.title}</h1>
			<h1 className="mb-4 text-lg font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
				{text.description}
			</h1>
		</div>
	);
}
