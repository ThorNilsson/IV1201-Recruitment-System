import React from "react";
import { useRouter } from "next/router";
import { translations } from "../../languages/translations";
import Loading from "../app/(Components)/Loading";

function Register() {
	const { locale } = useRouter();
	const text = translations[locale == null ? "en" : locale]?.header;

	if (text == null) return <Loading />;

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900/90 to-[#15162c]">
			<h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
				Register Page {text.companyName}
			</h1>
		</div>
	);
}

export default Register;
