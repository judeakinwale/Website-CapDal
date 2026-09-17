export const getLocalStorage = (): Storage | undefined => {
  if (typeof window === "undefined") return;
  return window.localStorage;
};

export const getLocalStorageItem = (key: string): string | undefined | null => {
  const localStorage = getLocalStorage();
  return localStorage?.getItem(key);
};

export const setLocalStorageItem = (key: string, value: any): void => {
  const localStorage = getLocalStorage();
  localStorage?.setItem(key, JSON.stringify(value));
};

export const removeLocalStorageItem = (key: string): void => {
  const localStorage = getLocalStorage();
  localStorage?.removeItem(key);
};
