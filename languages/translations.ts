//import { localeType } from "../src/types/localeTypes";

/**
 * To add a new translation:
 * 1. Make a new translation file: locale-[languagecode].ts
 * 2. Translate to the new language.
 * 3. Import the new translationfile here and add it to the array.
 * 
 * The first translation in the array will be the default language.
 */
import { translationsType } from "../src/types/localeTypes";
import en from "./locale-en";
import se from "./locale-se";

export const translations: translationsType =  {en, se} // Add new translations to array here