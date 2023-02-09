import React from "react";

function PageBackground(props: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-gray-100/90 to-gray-200 dark:from-gray-900 dark:to-[#15162c]">
      {props.children}
    </div>
  );
}

export default PageBackground;
