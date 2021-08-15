import { LocationDescriptor } from "history";
import styled from "styled-components";
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
  grid-template-rows: auto auto 3rem;
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
  border-top: 1px solid var(--border-color);
`;

const IssueListItem = styled.li`
  &:nth-child(even) {
    background: rgba(32, 33, 37, 0.06);
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--border-color);
  }
`;

interface Props {
  issues: Array<Issue>;

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
      </TableHead>
      <ul>
        {issues.map((issue) => (
          <IssueListItem key={issue.id}>
            <IssueItem {...issue} />
          </IssueListItem>
        ))}
      </ul>
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
