import React, { FormEventHandler } from "react";

/**
 * @param {string} name - Name of the input field.
 * @param {string} type - Type of the input field.
 * @param {string} value - Value of the input field.
 * @param {boolean} required - If the input field is required.
 * @param {FormEventHandler<HTMLInputElement>} onInput - On input handler.
 * @param {boolean} valid - If the input field is valid.
 * @returns {JSX.Element} - React component.
 * @description Input component for retrieving user data.
 */
export default function InputField(
  name: string,
  label: string,
  type: string,
  value: string,
  required: boolean,
  onInput: FormEventHandler<HTMLInputElement>,
  validate: (value: string) => boolean,
) {
  const valid = validate(name);
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
      <input
        type={type}
        name={name}
        className={
          "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        }
        style={valid || value === "" ? {} : { borderColor: "red" }}
        placeholder={label}
        required={required}
        onChange={onInput}
      />
    </div>
  );
}
