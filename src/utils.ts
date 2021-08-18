/**
 * Creates an empty array of specified length and fills it with `undefined`.
 *
 * Regular Array API creates array with 6 `empty` slots which can not be mapped until `.fill` is
 * called on it.
 */
export const createArray = (length: number) =>
  new Array(length).fill(undefined);

/**
 * Extract total pages from `Link` header returned by github
 *
 * Header string looks like this:
 * <https://api.github.com/repositories/:id/issues?state=open&page=2>; rel="next", <https://api.github.com/repositories/193885464/issues?state=open&page=4>; rel="last"
 *
 * `rel="last"` indicates what is the request URL to get last page. URL has a query param `page` that indicates last page.
 * This function extracts value of that query parameter.
 *
 * @param link Link header string
 * @returns Number indicating total amount of pages
 * @see https://docs.github.com/en/rest/guides/traversing-with-pagination Documentation on Link header
 */
export const getTotalPagesFromLink = (link: string) => {
  const items = link.split(", ");
  const itemWithLast = items.find((item) => item.includes(`rel="last"`));

  // If there's no item with rel="last", that means last page has been reached
  if (!itemWithLast) return -1;

  const url = itemWithLast.replace(/<|>; rel="last"/gm, "");

  try {
    const parsedUrl = new URL(url);
    const pagesString = parsedUrl.searchParams.get("page");
    const pages = Number(pagesString);

    return isNaN(pages) ? undefined : pages;
  } catch {
    return undefined;
  }
};

export const isDefined = <T extends unknown>(
  optional: T
): optional is NonNullable<T> => optional !== null && optional !== undefined;

export const constructIssueUrl = (
  organization: string,
  repository: string,
  number: string | number
) => `/${organization}/${repository}/issues/${number}`;

export const constructIssuesViewUrl = (
  organization: string,
  repository: string
) => `/${organization}/${repository}`;
