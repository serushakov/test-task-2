import { LocationDescriptor } from "history";
import styled from "styled-components";
import { IssueStateFilter } from "../../common";
import { IssueItem } from "./IssueItem";
import { Pagination } from "../Pagination";
import { Issue } from "./types";
import { Select } from "../Select";
import { FormattedMessage } from "react-intl";
import { getMessageId } from "../../i18n/getMessageId";

const STATE_FILTER_OPTIONS = [
  {
    label: IssueStateFilter.open,
    value: IssueStateFilter.open,
  },
  {
    label: IssueStateFilter.closed,
    value: IssueStateFilter.closed,
  },
  {
    label: IssueStateFilter.all,
    value: IssueStateFilter.all,
  },
];

const Root = styled.div`
  width: 100%;
  box-shadow: 0 4px 12px 2px rgba(32, 33, 37, 0.06);
  border: 1px solid var(--border-color);
  border-radius: 1rem;
  overflow: hidden;

  display: grid;
  grid-template-rows: auto auto 3rem;
`;

const FilterRow = styled.div`
  width: 100%;
  border-bottom: 1px solid var(--border-color);
  padding: 1rem;
`;

const FilterItem = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
`;

const FilterItemLabel = styled.label`
  font-size: 0.875rem;
  color: rgba(32, 33, 37, 0.8);
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

const IssuesTable = ({
  issues,
  pages,
  page,
  pageLinkCreator,
  stateFilter,
  onStateFilterChange,
}: Props) => {
  return (
    <Root>
      <FilterRow>
        <FilterItem>
          <FilterItemLabel>
            <FormattedMessage
              id={getMessageId("issues-table.filters.state.label")}
            />
          </FilterItemLabel>
          <Select
            value={stateFilter}
            options={STATE_FILTER_OPTIONS}
            onChange={onStateFilterChange}
          />
        </FilterItem>
      </FilterRow>
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
