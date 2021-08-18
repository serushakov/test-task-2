import { useHistory } from "react-router-dom";
import {
  IssueSortingDirection,
  IssueSortingOption,
  IssueStateFilter,
  ITEMS_PER_PAGE_VARIANTS,
} from "../../common";
import { useNumericSearchParam } from "../../hooks/useNumericSearchParam";
import { useSearchParam } from "../../hooks/useSearchParam";

const useIssuesQueryParams = () => {
  const {
    location: { search },
  } = useHistory();

  const page = useNumericSearchParam("page", search, 1);

  const stateFilter = useSearchParam<IssueStateFilter>(
    "stateFilter",
    search,
    IssueStateFilter.open
  );
  const sorting = useSearchParam<IssueSortingOption>(
    "sorting",
    search,
    IssueSortingOption.created
  );
  const sortDirection = useSearchParam<IssueSortingDirection>(
    "sortDirection",
    search,
    IssueSortingDirection.desc
  );
  const itemsPerPage = useNumericSearchParam(
    "itemsPerPage",
    search,
    ITEMS_PER_PAGE_VARIANTS[2]
  );

  return {
    page,
    stateFilter,
    sorting,
    sortDirection,
    itemsPerPage,
  };
};

export { useIssuesQueryParams };
