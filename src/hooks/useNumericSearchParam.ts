import { useSearchParam } from "./useSearchParam";

function useNumericSearchParam(
  param: string,
  search: string,
  defaultValue?: number
): number;
function useNumericSearchParam(
  param: string,
  search: string,
  defaultValue?: undefined
): number | undefined;
function useNumericSearchParam(
  param: string,
  search: string,
  defaultValue?: number
) {
  const paramValue = useSearchParam(param, search);
  if (paramValue === null) return defaultValue;

  const numberParamValue = Number(paramValue);
  return isNaN(numberParamValue) ? defaultValue : numberParamValue;
}

export { useNumericSearchParam };
