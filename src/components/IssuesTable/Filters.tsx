import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import {
  IssueSortingDirection,
  IssueSortingOption,
  IssueStateFilter,
  ITEMS_PER_PAGE_VARIANTS,
} from "../../common";
import { getMessageId } from "../../i18n/getMessageId";
import { Select } from "../Select";

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

const SORTING_OPTIONS = [
  {
    label: IssueSortingOption.created,
    value: IssueSortingOption.created,
  },
  {
    label: IssueSortingOption.updated,
    value: IssueSortingOption.updated,
  },
  {
    label: IssueSortingOption.comments,
    value: IssueSortingOption.comments,
  },
];

const SORT_DIRECTION_OPTIONS = [
  {
    label: IssueSortingDirection.asc,
    value: IssueSortingDirection.asc,
  },
  {
    label: IssueSortingDirection.desc,
    value: IssueSortingDirection.desc,
  },
];

const ITEMS_PER_PAGE_OPTIONS = ITEMS_PER_PAGE_VARIANTS.map((amount) => ({
  label: String(amount),
  value: amount,
}));

const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-width: 0;
  gap: 2rem;
`;

const FilterItem = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
`;

const SelectRow = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const FilterItemLabel = styled.label`
  font-size: 0.875rem;
  color: rgba(32, 33, 37, 0.8);
`;

interface Props {
  stateFilter: IssueStateFilter;
  onStateFilterChange: (state: IssueStateFilter) => void;

  sorting: IssueSortingOption;
  onSortingChange: (sorting: IssueSortingOption) => void;

  sortDirection: IssueSortingDirection;
  onSortDirectionChange: (sorting: IssueSortingDirection) => void;

  itemsPerPage: number;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

const Filters = ({
  stateFilter,
  onStateFilterChange,
  sorting,
  onSortingChange,
  sortDirection,
  onSortDirectionChange,
  itemsPerPage,
  onItemsPerPageChange,
}: Props) => {
  return (
    <FilterRow>
      <FilterItem>
        <FilterItemLabel htmlFor="filter-state" id="filter-state-label">
          <FormattedMessage
            id={getMessageId("issues-table.filters.state.label")}
          />
        </FilterItemLabel>
        <Select
          id="filter-state"
          aria-labelledby="filter-state-label"
          value={stateFilter}
          options={STATE_FILTER_OPTIONS}
          onChange={onStateFilterChange}
        />
      </FilterItem>
      <FilterItem>
        <FilterItemLabel htmlFor="filter-sorting" id="filter-sorting-label">
          <FormattedMessage
            id={getMessageId("issues-table.filters.sorting.label")}
          />
        </FilterItemLabel>
        <SelectRow>
          <Select
            id="filter-sorting"
            aria-labelledby="filter-sorting-label"
            value={sorting}
            options={SORTING_OPTIONS}
            onChange={onSortingChange}
          />
          <Select
            aria-labelledby="filter-sorting-label"
            value={sortDirection}
            options={SORT_DIRECTION_OPTIONS}
            onChange={onSortDirectionChange}
          />
        </SelectRow>
      </FilterItem>
      <FilterItem>
        <FilterItemLabel htmlFor="filter-state" id="filter-state-label">
          <FormattedMessage
            id={getMessageId("issues-table.filters.per-page.label")}
          />
        </FilterItemLabel>
        <Select
          id="filter-state"
          aria-labelledby="filter-state-label"
          value={itemsPerPage}
          options={ITEMS_PER_PAGE_OPTIONS}
          onChange={onItemsPerPageChange}
        />
      </FilterItem>
    </FilterRow>
  );
};

export { Filters };
