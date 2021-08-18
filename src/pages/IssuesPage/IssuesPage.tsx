import { useEffect } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { useIntl } from "react-intl";

import { Header } from "../../components/Header";
import { useFetch } from "../../hooks/useFetch";
import { octokitClient } from "../../octokitClient";
import { IssuesView } from "../../components/IssuesView/IssuesView";

import { useIssuesPageQueryParams } from "./useIssuesPageQueryParams";
import { useTotalPages } from "./useTotalPages";

type Props = RouteComponentProps<{
  organization: string;
  repository: string;
}>;

const IssuesPage = ({
  match: {
    params: { organization, repository },
  },
  location: { search },
}: Props) => {
  const history = useHistory();
  const intl = useIntl();

  const { page, sorting, sortDirection, stateFilter, itemsPerPage } =
    useIssuesPageQueryParams();

  const handleQueryParamChangeCreator =
    <T extends string | number>(queryParam: string) =>
    (newValue: T) => {
      const parsedSearch = new URLSearchParams(search);
      parsedSearch.set(queryParam, String(newValue));

      history.push({ search: parsedSearch.toString() });
    };

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

  const pages = useTotalPages(data?.linkHeader);

  useEffect(() => {
    // Make sure page query param is not larger than total pages
    if (pages && page > pages) {
      history.replace({ search: `page=${1}` });
    }
  }, [page, pages]);

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
        isLoading={loading}
        stateFilter={stateFilter}
        onStateFilterChange={handleQueryParamChangeCreator("stateFilter")}
        sorting={sorting}
        onSortingChange={handleQueryParamChangeCreator("sorting")}
        sortDirection={sortDirection}
        onSortDirectionChange={handleQueryParamChangeCreator("sortDirection")}
        page={page}
        pageLinkCreator={(page) =>
          `/${organization}/${repository}?page=${page}`
        }
        pages={pages ?? 0}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleQueryParamChangeCreator("itemsPerPage")}
      />
    </>
  );
};

export { IssuesPage };
