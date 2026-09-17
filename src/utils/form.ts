import { z } from "zod";

/**
 * Maps a list of interface or object keys into option-like objects with
 * configurable label and value property names.
 *
 * Each key is converted into a human-readable label by inserting spaces before
 * capital letters and capitalizing the first character.
 *
 * @param keys - The raw property names to transform.
 * @param labelKey - The property name to use for the generated label.
 * @param valueKey - The property name to use for the original key value.
 * @returns An array of objects containing formatted labels and original values.
 *
 * @example
 * interfaceKeysToArray(["firstName", "startDate"], "label", "value");
 * // Returns:
 * // [
 * //   { label: "First Name", value: "firstName" },
 * //   { label: "Start Date", value: "startDate" },
 * // ]
 */
export function interfaceKeysToArray(
  keys: string[],
  labelKey: string,
  valueKey: string,
): Array<Record<string, string>> {
  return keys.map((key) => {
    const label = key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
    return {
      [labelKey]: label,
      [valueKey]: key,
    };
  });
}

// For react hook form
export const preFn = (val: any) => (!val ? undefined : (val as any));
export const optionalString = z.preprocess(preFn, z.string().optional());
export const optionalNumber = z.preprocess(
  preFn,
  z.number({ coerce: true }).optional(),
);
export const optionalBoolean = z.preprocess(preFn, z.boolean().optional());
export const optionalAny = z.preprocess(preFn, z.any().optional());

export const requiredString = (message?: string) => {
  return z.string().min(1, message);
};
export const requiredNumber = (message?: string) => {
  return z.number({ coerce: true }).min(0, message);
};
export const requiredBoolean = (message?: string) => {
  return z.boolean({ coerce: true }).refine((val) => val === true, {
    message: message,
  });
};
export const requiredAny = (message?: string) => {
  return z.any().refine((val) => val ?? false, {
    message: message,
  });
};

export const conditionRequiredString = (
  condition: boolean,
  message?: string,
) => {
  return condition ? requiredString(message) : optionalString;
};
export const conditionRequiredNumber = (
  condition: boolean,
  message?: string,
) => {
  return condition ? requiredNumber(message) : optionalNumber;
};
export const conditionRequiredBoolean = (
  condition: boolean,
  message?: string,
) => {
  return condition ? requiredBoolean(message) : optionalBoolean;
};
export const conditionRequiredAny = (condition: boolean, message?: string) => {
  return condition ? requiredAny(message) : optionalAny;
};
// For react hook form
