import { useEffect, useState } from "react";
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
  padding: 0 var(--side-padding);
  margin: 0 auto;

  display: flex;
  justify-content: center;
  align-items: center; ;
`;

const links = [{ label: "Choose another repository", to: { pathname: "/" } }];

type Props = RouteComponentProps<{
  organization: string;
  repository: string;
}>;

const getTotalPagesFromLink = (link: string) => {
  const items = link.split(", ");
  const itemWithLast = items.find((item) => item.includes(`rel="last"`));
  const url = itemWithLast?.replace(/<|>; rel="last"/gm, "");

  if (!url) return undefined;

  const parsedUrl = new URL(url);
  const pagesString = parsedUrl.searchParams.get("page");
  const pages = Number(pagesString);

  return pages;
};

const Issues = ({
  match: {
    params: { organization, repository },
  },
}: Props) => {
  const [stateFilter, setStateFilter] = useState<IssueStateFilter>(
    IssueStateFilter.open
  );
  const [page, setPage] = useState(1);

  const { data } = useFetch(["issues", organization, repository], async () => {
    const {
      data: issues,
      headers: { link },
    } = await octokitClient.rest.issues.listForRepo({
      owner: organization,
      repo: repository,
      state: stateFilter,
      page,
    });

    return { issues, pages: link ? getTotalPagesFromLink(link) : undefined };
  });

  const issues = data?.issues;
  const pages = data?.pages;

  useEffect(() => {
    console.log(issues);
  }, [issues]);

  return (
    <>
      <Header links={links} />
      <PageContent>
        {issues && (
          <IssuesTable
            issues={issues.map(
              ({ title, comments, id, number, user, state }) => ({
                id,
                number,
                title,
                comments,
                state,
                author: user?.login ?? "unknown",
                link: {
                  pathname: `/${organization}/${repository}/issues/${number}`,
                },
              })
            )}
            page={page}
            onPageChange={setPage}
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
