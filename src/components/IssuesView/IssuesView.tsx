import { LocationDescriptor } from "history";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import {
  IssueSortingDirection,
  IssueSortingOption,
  IssueStateFilter,
} from "../../common";
import { getMessageId } from "../../i18n/getMessageId";
import { IssuesTable } from "../IssuesTable";
import { Issue } from "../IssuesTable/types";

const PageContent = styled.div`
  flex: 1;
  max-width: var(--content-width);
  width: 100%;
  padding: 4rem var(--side-padding);
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 2rem;
`;

interface Props {
  issues: Array<Issue> | undefined;
  isLoading: boolean;

  itemsPerPage: number;
  onItemsPerPageChange: (itemsPerPage: number) => void;

  stateFilter: IssueStateFilter;
  onStateFilterChange: (state: IssueStateFilter) => void;

  sorting: IssueSortingOption;
  onSortingChange: (sorting: IssueSortingOption) => void;

  sortDirection: IssueSortingDirection;
  onSortDirectionChange: (sorting: IssueSortingDirection) => void;

  page: number;
  pageLinkCreator: (page: number) => LocationDescriptor;
  pages: number;
}

const IssuesView = ({
  issues,
  isLoading,
  itemsPerPage,
  onItemsPerPageChange,
  stateFilter,
  onStateFilterChange,
  sortDirection,
  onSortDirectionChange,
  sorting,
  onSortingChange,
  page,
  pageLinkCreator,
  pages,
}: Props) => {
  return (
    <PageContent>
      <Title>
        <FormattedMessage id={getMessageId("issues-table.title")} />
      </Title>
      <IssuesTable
        issues={issues}
        isLoading={isLoading}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        stateFilter={stateFilter}
        onStateFilterChange={onStateFilterChange}
        sortDirection={sortDirection}
        onSortDirectionChange={onSortDirectionChange}
        sorting={sorting}
        onSortingChange={onSortingChange}
        page={page}
        pageLinkCreator={pageLinkCreator}
        pages={pages}
      />
    </PageContent>
  );
};

export { IssuesView };
