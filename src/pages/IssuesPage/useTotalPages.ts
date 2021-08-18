import { useEffect, useState } from "react";
import { getTotalPagesFromLink } from "../../utils";

const useTotalPages = (linkHeader: string | undefined) => {
  const [pages, setPages] = useState<number>();

  useEffect(() => {
    if (!linkHeader) return;

    const pagesFromHeader = getTotalPagesFromLink(linkHeader);
    setPages(pagesFromHeader === -1 ? undefined : pagesFromHeader);

    // Effect should only run when `linkHeader` changes
  }, [linkHeader]);

  return pages;
};

export { useTotalPages };
