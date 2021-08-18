import { useEffect, useState } from "react";
import { debounce } from "lodash";

interface Options {
  debounce?: number;
}

const useFetch = <T, ErrorT = Error>(
  key: string | Array<unknown>,
  fetchFunction: () => Promise<T>,
  options?: Options
) => {
  const [data, setData] = useState<T | undefined>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorT>();

  useEffect(
    () => {
      /**
       * This object facilitates ignoring of fetches.
       *
       * If `key` changes in the middle of a request result of that request should be ignored.
       * This helps avoiding concurrency issues.
       *
       * Reference to the object will be captured by the function and hence
       * up to date value of `current` is available to the function.
       */
      let ignore = {
        current: false,
      };

      const doFetch = async () => {
        setLoading(true);
        try {
          const data = await fetchFunction();

          if (ignore.current) return;

          setLoading(false);
          setError(undefined);
          setData(data);
        } catch (error) {
          setError(error);
          setData(undefined);
          setLoading(false);
        }
      };

      if (options?.debounce) {
        const doFetchDebounced = debounce(doFetch, options.debounce);

        doFetchDebounced();

        return () => {
          doFetchDebounced.cancel();
          ignore.current = true;
        };
      } else {
        doFetch();

        return () => {
          ignore.current = true;
        };
      }
    },
    typeof key === "string" ? [key] : key
  );

  return {
    data,
    isLoading,
    error,
  };
};

export { useFetch };
