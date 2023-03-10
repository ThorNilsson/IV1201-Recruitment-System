import React from "react";

/**
 * @returns {React.ReactElement} - React component.
 * @description Component for showing the background gradient.
 */
export default function PageBackground(props: { children: React.ReactNode }) {
  return (
    <div className="min-h-full w-full items-center justify-center bg-gradient-to-b from-gray-100/90 to-gray-200 dark:from-gray-900 dark:to-[#15162c]">
      {props.children}
    </div>
  );
}
