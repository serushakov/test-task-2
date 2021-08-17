import { useMemo } from "react";

function useSearchParam<T extends string = string>(
  param: string,
  search: string,
  defaultValue?: undefined
): T | undefined;
function useSearchParam<T extends string = string>(
  param: string,
  search: string,
  defaultValue?: T
): T;
function useSearchParam<T extends string = string>(
  param: string,
  search: string,
  defaultValue?: T
) {
  return useMemo(() => {
    const params = new URLSearchParams(search);

    const paramValue = params.get(param);

    return (paramValue as T | null) ?? defaultValue;
  }, [search, param]);
}

export { useSearchParam };
