import { useEffect, useMemo, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { Octokit } from "octokit";

import { Header } from "../components/Header";
import { useFetch } from "../hooks/useFetch";
import { IssuesTable } from "../components/IssuesTable";

import { IssueStateFilter } from "../common";

const octokitClient = new Octokit();

const PageContent = styled.div`
  flex: 1;
  max-width: var(--content-width);
  width: 100%;
  padding: 4rem var(--side-padding) 0;
  margin: 0 auto;
`;

const links = [{ label: "Choose another repository", to: { pathname: "/" } }];

type Props = RouteComponentProps<{
  organization: string;
  repository: string;
}>;

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
const getTotalPagesFromLink = (link: string) => {
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

const Issues = ({
  match: {
    params: { organization, repository },
  },
  location: { search },
}: Props) => {
  const [stateFilter, setStateFilter] = useState<IssueStateFilter>(
    IssueStateFilter.open
  );
  const [pages, setPages] = useState<number>();

  const page = useMemo(() => {
    const params = new URLSearchParams(search);

    const pageParam = params.get("page");

    const parsedPage = Number(pageParam);

    return isNaN(parsedPage) ? 1 : parsedPage;
  }, [search]);

  const { data } = useFetch(
    ["issues", organization, repository, page],
    async () => {
      const {
        data: issues,
        headers: { link },
      } = await octokitClient.rest.issues.listForRepo({
        owner: organization,
        repo: repository,
        state: stateFilter,
        page,
      });

      return { issues, linkHeader: link };
    }
  );

  useEffect(() => {
    if (typeof pages === "number" || !data?.linkHeader) return;

    const pagesFromHeader = getTotalPagesFromLink(data.linkHeader);
    setPages(pagesFromHeader === -1 ? page : pagesFromHeader);

    // Effect should only run when `linkHeader` changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.linkHeader]);

  return (
    <>
      <Header links={links} />
      <PageContent>
        {data?.issues && (
          <IssuesTable
            issues={data.issues.map(
              ({ title, comments, id, number, user, state }) => ({
                id,
                number,
                title,
                comments,
                state,
                author: user?.login ?? "unknown",
                link: `/${organization}/${repository}/issues/${number}`,
              })
            )}
            page={page}
            pageLinkCreator={(page) =>
              `/${organization}/${repository}?page=${page}`
            }
            pages={pages ?? 0}
            stateFilter={stateFilter}
            onStateFilterChange={setStateFilter}
          />
        )}
      </PageContent>
    </>
  );
};

export { Issues };
