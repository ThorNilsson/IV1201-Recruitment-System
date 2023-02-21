import Link from "next/link";
import React from "react";
import Loading from "./Loading";

/**
 * @param {string} label - Title of the button.
 * @param {boolean} disabled - If the button is disabled.
 * @param {() => void} onClick - On click handler.
 * @description Button component for handling user interaction.
 * @returns {JSX.Element} - React component.
 */
export function Button({
  children,
  disabled,
  onClick,
}: { children: React.ReactNode; disabled: boolean; onClick: () => void }) {
  return (
    <button
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

/**
 * @param {string} label - Title of the button.
 * @param {string} isLoading - If the button is loading.
 * @param {boolean} disabled - If the button is disabled.
 * @description Input component for submitting user data in a form element.
 */
export function SubmitButton({ label, isLoading, disabled }: { label: string; isLoading: boolean; disabled: boolean }) {
  return (
    <div className="flex flex-col space-y-7 items-center justify-center">
      {isLoading ? (
        <Loading />
      ) : (
        <input
          className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800${
            disabled ? " opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
          value={label}
          disabled={disabled}
        />
      )}
    </div>
  );
}

/**
 *
 * @param {string} children - Children of the button.
 * @param {string} href - Link of the button.
 * @description Navigation component for navigating to other pages.
 * @returns {JSX.Element} - React component.
 */
export function LinkButton({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <Link
      href={href}
      className="text-white bg-blue-300 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      {children}
    </Link>
  );
}
