import { useRouter } from "next/router";
import React from "react";
import { translations } from "../../languages/translations";

export default function NoAccess() {
  /* Translations */
  const { locale } = useRouter();
  const text = translations[locale || "en"]?.app;

  return (
    <div className="flex min-h-screen flex-col space-y-5 items-center justify-center bg-gradient-to-b from-gray-900/90 to-[#15162c]">
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">{text?.noAccess}</h1>
    </div>
  );
}
