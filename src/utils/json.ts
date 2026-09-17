export const tryParse = <T>(
  value: string,
  defaultValue: T | any = undefined,
) => {
  if (!value) return defaultValue;
  try {
    return JSON.parse(value) as T;
  } catch (error) {
    console.error(`Error parsing JSON: ${error}`);
    return defaultValue;
  }
};

export const tryStringify = (value: any, defaultValue?: string) => {
  try {
    return JSON.stringify(value) as string;
  } catch (error) {
    console.error(`Error stringifying value: ${error}`);
    return defaultValue;
  }
};
