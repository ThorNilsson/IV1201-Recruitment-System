/**
 * @file ErrorPage.tsx
 * @description Page for showing a loading animation.
 * @author Thor Nilsson
 * @exports ErrorPage - React component.
 */

import React from "react";
import { Router, useRouter } from "next/router";
import { translations } from "../../languages/translations";
import { TRPCError } from "@trpc/server";

/**
 * @returns {React.ReactElement} - React component.
 * @description Error page for showing a error messages.
 */
export default function ErrorPage({ errorCode }: { errorCode: TRPCError["code"] }) {
  const router = useRouter();

  /* Translations */
  const { locale } = router;
  const text = translations[locale || "en"]?.errors;

  /* Handelers */
  const handleReload = () => {
    router.reload();
  };

  /* Views */
  return (
    <div className="flex flex-col space-y-7 items-center justify-center min-h-full">
      <div className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">❌ {text?.[errorCode]}</div>
      <button onClick={handleReload}> Try again </button> //Todo: Add translation
    </div>
  );
}
