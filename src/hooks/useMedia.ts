import { useEffect, useState } from "react";

const useMedia = (mediaString: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(mediaString);
    const listener = (event: MediaQueryListEventInit) =>
      setMatches(!!event.matches);

    setMatches(media.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [mediaString]);

  return matches;
};

export { useMedia };
