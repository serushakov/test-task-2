import { LocationDescriptor } from "history";
import styled from "styled-components";
import { IssueStateFilter } from "../../common";
import { IssueItem } from "./IssueItem";
import { Pagination } from "../Pagination";
import { Issue } from "./types";

const ISSUE_STATES = [
  IssueStateFilter.open,
  IssueStateFilter.closed,
  IssueStateFilter.all,
];

const Root = styled.div`
  width: 100%;
  box-shadow: 0 4px 12px 2px rgba(32, 33, 37, 0.06);
  border: 1px solid var(--border-color);
  border-radius: 1rem;
  overflow: hidden;

  display: grid;
  grid-template-rows: 3rem auto 3rem;
`;

const FilterRow = styled.div`
  width: 100%;
  border-bottom: 1px solid var(--border-color);
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
  stateFilter: IssueStateFilter;
  onStateFilterChange: (state: IssueStateFilter) => void;
  page: number;
  pageLinkCreator: (page: number) => LocationDescriptor;
  pages: number;
  issues: Array<Issue>;
}

const IssuesTable = ({ issues, pages, page, pageLinkCreator }: Props) => {
  return (
    <Root>
      <FilterRow></FilterRow>
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
