import { useMemo, useState } from "react";

const parseValue = (value: string | null) => {
  if (value === null) return null;

  try {
    return JSON.parse(value);
  } catch (e) {
    console.error(`Could not parse localstorage value ${value}`);
  }
};

const useLocalStorage = <T extends unknown>(key: string) => {
  const initialValue = useMemo(() => parseValue(localStorage.getItem(key)), []);
  const [value, setValue] = useState<T | null>(initialValue);

  const handleSetValue = (newValue: T | null) => {
    const serializedValue = JSON.stringify(newValue);

    localStorage.setItem(key, serializedValue);

    setValue(newValue);
  };

  return [value, handleSetValue] as const;
};
export { useLocalStorage };
