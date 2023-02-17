/**
 * @file LoadingPage.tsx
 * @description Component for showing a loading animation.
 * @author Thor Nilsson
 * @exports LoadingPage - React component.
 */

import React from "react";
import Loading from "./Loading";

/**
 * @returns {React.ReactElement} - React component.
 * @description Component for showing a loading animation as full page.
 */
export default function LoadingPage() {
  return (
    <div className="flex flex-col space-y-7 items-center justify-center min-h-full">
      <Loading />
    </div>
  );
}
