import { useEffect, useState } from "react";

interface Options {
  debounce?: number;
}

const useFetch = <T, ErrorT = Error>(
  key: string | Array<string>,
  fetchFunction: () => Promise<T>,
  options?: Options
) => {
  const [data, setData] = useState<T | undefined>();
  const [loading, setLoading] = useState(false);
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
        }
      };

      doFetch();

      return () => {
        ignore.current = true;
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    typeof key === "string" ? [key] : key
  );

  return {
    data,
    loading,
    error,
  };
};

export { useFetch };
