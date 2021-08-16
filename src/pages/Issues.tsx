import { useEffect, useMemo, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";

import { Header } from "../components/Header";
import { useFetch } from "../hooks/useFetch";
import { IssuesTable } from "../components/IssuesTable";
import {
  IssueSortingOption,
  IssueStateFilter,
  IssueSortingDirection,
  DEFAULT_ITEMS_PER_PAGE,
} from "../common";
import { getMessageId } from "../i18n/getMessageId";
import { octokitClient } from "../octokitClient";
import { getTotalPagesFromLink } from "../utils";

const PageContent = styled.div`
  flex: 1;
  max-width: var(--content-width);
  width: 100%;
  padding: 4rem var(--side-padding);
  margin: 0 auto;
`;

const links = [{ label: "Choose another repository", to: { pathname: "/" } }];

type Props = RouteComponentProps<{
  organization: string;
  repository: string;
}>;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 2rem;
`;

const Issues = ({
  match: {
    params: { organization, repository },
  },
  location: { search },
}: Props) => {
  const history = useHistory();

  const [stateFilter, setStateFilter] = useState<IssueStateFilter>(
    IssueStateFilter.open
  );
  const [sorting, setSorting] = useState<IssueSortingOption>(
    IssueSortingOption.created
  );
  const [sortDirection, setSortDirection] = useState<IssueSortingDirection>(
    IssueSortingDirection.desc
  );
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    DEFAULT_ITEMS_PER_PAGE
  );
  const [pages, setPages] = useState<number>();

  const page = useMemo(() => {
    const params = new URLSearchParams(search);

    const pageParam = params.get("page");

    const parsedPage = Number(pageParam);

    return isNaN(parsedPage) ? 1 : parsedPage;
  }, [search]);

  const { data, loading } = useFetch(
    [
      "issues",
      organization,
      repository,
      page,
      stateFilter,
      sorting,
      sortDirection,
      itemsPerPage,
    ],
    async () => {
      const {
        data: issues,
        headers: { link },
      } = await octokitClient.rest.issues.listForRepo({
        owner: organization,
        repo: repository,
        state: stateFilter,
        page,
        sort: sorting,
        direction: sortDirection,
        per_page: itemsPerPage,
      });

      return { issues, linkHeader: link };
    }
  );

  useEffect(() => {
    if (!data?.linkHeader) return;

    const pagesFromHeader = getTotalPagesFromLink(data.linkHeader);
    setPages(pagesFromHeader === -1 ? page : pagesFromHeader);

    // Effect should only run when `linkHeader` changes
  }, [data?.linkHeader]);

  useEffect(() => {
    if (pages && page > pages) {
      history.replace({ search: `page=${1}` });
    }
  }, [page, pages]);

  return (
    <>
      <Header links={links} />
      <PageContent>
        <Title>
          <FormattedMessage id={getMessageId("issues-table.title")} />
        </Title>
        <IssuesTable
          issues={data?.issues.map(
            ({ title, comments, id, number, user, state, created_at }) => ({
              id,
              number,
              title,
              comments,
              state,
              author: user?.login ?? "unknown",
              link: `/${organization}/${repository}/issues/${number}`,
              date: new Date(created_at),
            })
          )}
          isLoading={loading}
          stateFilter={stateFilter}
          onStateFilterChange={setStateFilter}
          sorting={sorting}
          onSortingChange={setSorting}
          sortDirection={sortDirection}
          onSortDirectionChange={setSortDirection}
          page={page}
          pageLinkCreator={(page) =>
            `/${organization}/${repository}?page=${page}`
          }
          pages={pages ?? 0}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </PageContent>
    </>
  );
};

export { Issues };
