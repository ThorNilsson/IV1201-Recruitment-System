/**
 * @file Error.tsx
 * @description Component for showing a loading animation.
 * @author Thor Nilsson
 * @exports Error - React component.
 */

import React from "react";
import { useRouter } from "next/router";
import { translations } from "../../languages/translations";
import { TRPCError } from "@trpc/server";
import Loading from "./Loading";

/**
 * @returns {React.ReactElement} - React component.
 * @description Error for showing a error messages.
 */
export default function ErrorMessage({ errorCode }: { errorCode: TRPCError["code"] }) {
  /* Translations */
  const { locale } = useRouter();
  const text = translations[locale || "en"]?.errors;

  /* Views */
  return (
    <div className="flex flex-col space-y-7 items-center justify-center min-h-full">
      <div className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">❌ {text?.[errorCode]}</div>
    </div>
  );
}
