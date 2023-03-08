/**
 * To add a new translation:
 * 1. Make a new translation file: locale-[languagecode].ts
 * 2. Translate to the new language.
 * 3. Import the new translationfile here and add it to the array.
 *
 * The first translation in the array will be the default language.
 */

import en_US from "./locale-en_US";
import sv_SE from "./locale-sv_SE";

export type translationsType = {
  [key: string]: typeof en_US;
};

export const translations: translationsType = { en_US, sv_SE }; // Add new translations to array here
