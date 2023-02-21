import React from "react";

export function Title({ children }: { children: React.ReactNode }) {
  return <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">{children}</h1>;
}

export function Subtitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{children}</h2>;
}

export function Description({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-4 text-lg font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
      {children}
    </h3>
  );
}

export function Text({ children }: { children: React.ReactNode }) {
  return <p className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">{children}</p>;
}
