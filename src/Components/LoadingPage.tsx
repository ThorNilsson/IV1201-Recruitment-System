/**
 * @file Loading.tsx
 * @description Page for showing a loading animation.
 * @author Thor Nilsson
 * @exports LoadingPage - React component.
 */

import React from "react";
import Loading from "./Loading";
import PageBackground from "./PageBackground";

/**
 * @returns {React.ReactElement} - React component.
 * @description Page for showing a loading animation.
 */
export default function LoadingPage() {
  return (
    <PageBackground>
      <Loading />
    </PageBackground>
  );
}
