/**
 * @file ErrorPage.tsx
 * @description Page for showing a loading animation.
 * @author Thor Nilsson
 * @exports ErrorPage - React component.
 */

import React from "react";
import { useRouter } from "next/router";
import { translations } from "../../languages/translations";
import { TRPCError } from "@trpc/server";
import { Button } from "./Buttons";
import { Title } from "./Typography";

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
      <Title>❌ {text?.[errorCode]}</Title>
      <Button onClick={handleReload} disabled>
        {text?.retryBtn}
      </Button>
    </div>
  );
}
