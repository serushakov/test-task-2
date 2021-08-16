import { LocationDescriptor } from "history";
import styled from "styled-components";
import { Loader } from "react-feather";

import {
  IssueSortingOption,
  IssueStateFilter,
  IssueSortingDirection,
} from "../../common";
import { Pagination } from "../Pagination";

import { IssueItem } from "./IssueItem";
import { Filters } from "./Filters";
import { Issue } from "./types";

const Root = styled.div`
  width: 100%;
  box-shadow: 0 4px 12px 2px rgba(32, 33, 37, 0.06);
  border: 1px solid var(--border-color);
  border-radius: 1rem;
  overflow: hidden;

  display: grid;
  grid-template-rows: repeat(auto, 3);
`;

const TableHead = styled.div`
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
`;

const PaginationRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid var(--border-color);
  padding: 1rem;
`;

const IssueList = styled.ul`
  min-width: 0;
`;

const IssueListItem = styled.li`
  &:nth-child(even) {
    background: rgba(32, 33, 37, 0.03);
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--border-color);
  }
`;

const LoadingSpinner = styled(Loader)`
  color: rgba(32, 33, 37, 0.64);
  align-self: center;
  animation: spin 1s linear infinite;
  width: 2rem;
  height: 2rem;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

interface Props {
  issues: Array<Issue>;
  isLoading: boolean;

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

const IssuesTable = ({
  issues,
  pages,
  page,
  pageLinkCreator,
  stateFilter,
  onStateFilterChange,
  sorting,
  onSortingChange,
  sortDirection,
  onSortDirectionChange,
  isLoading,
}: Props) => {
  return (
    <Root>
      <TableHead>
        <Filters
          stateFilter={stateFilter}
          onStateFilterChange={onStateFilterChange}
          sorting={sorting}
          onSortingChange={onSortingChange}
          sortDirection={sortDirection}
          onSortDirectionChange={onSortDirectionChange}
        />
        {isLoading && <LoadingSpinner />}
      </TableHead>
      <IssueList>
        {issues.map((issue) => (
          <IssueListItem key={issue.id}>
            <IssueItem {...issue} />
          </IssueListItem>
        ))}
      </IssueList>
      <PaginationRow>
        <Pagination
          page={page}
          pages={pages}
          pageLinkCreator={pageLinkCreator}
        />
      </PaginationRow>
    </Root>
  );
};

export { IssuesTable };
