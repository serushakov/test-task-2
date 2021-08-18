import { useEffect } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { useIntl } from "react-intl";

import { Header } from "../../components/Header";
import { useFetch } from "../../hooks/useFetch";
import { octokitClient } from "../../octokitClient";
import { IssuesView } from "../../components/IssuesView/IssuesView";

import { useIssuesQueryParams } from "./useIssuesQueryParams";
import { useTotalPages } from "./useTotalPages";

type Props = RouteComponentProps<{
  organization: string;
  repository: string;
}>;

const IssuesViewWrapper = ({
  match: {
    params: { organization, repository },
  },
  location: { search },
}: Props) => {
  const history = useHistory();
  const intl = useIntl();

  const { page, sorting, sortDirection, stateFilter, itemsPerPage } =
    useIssuesQueryParams();

  const handleQueryParamChangeCreator =
    <T extends string | number>(queryParam: string) =>
    (newValue: T) => {
      const parsedSearch = new URLSearchParams(search);
      parsedSearch.set(queryParam, String(newValue));

      history.push({ search: parsedSearch.toString() });
    };

  const { data, isLoading } = useFetch(
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

  const pages = useTotalPages(data?.linkHeader) ?? page;

  useEffect(() => {
    // Make sure page query param is not larger than total pages
    if (pages && page > pages) {
      history.replace({ search: `page=${1}` });
    }
  }, [page, pages]);

  console.log(page, pages);

  return (
    <>
      <Header
        links={[
          {
            label: intl.formatMessage({ id: "header.switch-repo-link" }),
            to: { pathname: "/" },
          },
        ]}
      />
      <IssuesView
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
        isLoading={isLoading}
        stateFilter={stateFilter}
        onStateFilterChange={handleQueryParamChangeCreator("stateFilter")}
        sorting={sorting}
        onSortingChange={handleQueryParamChangeCreator("sorting")}
        sortDirection={sortDirection}
        onSortDirectionChange={handleQueryParamChangeCreator("sortDirection")}
        page={page}
        pageLinkCreator={(page) => {
          const params = new URLSearchParams();

          params.set("sorting", sorting);
          params.set("stateFilter", stateFilter);
          params.set("sortDirection", sortDirection);
          params.set("itemsPerPage", String(itemsPerPage));
          params.set("page", String(page));
          return {
            pathname: `/${organization}/${repository}`,
            search: params.toString(),
          };
        }}
        pages={pages ?? 0}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleQueryParamChangeCreator("itemsPerPage")}
      />
    </>
  );
};

export { IssuesViewWrapper };
