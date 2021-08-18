import { LocationDescriptor } from "history";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import {
  BookmarkedIssue,
  IssueSortingDirection,
  IssueSortingOption,
  IssueStateFilter,
} from "../../common";
import { getMessageId } from "../../i18n/getMessageId";
import { BookmarkedIssues } from "../BookmarkedIssues";
import { IssuesTable } from "../IssuesTable";
import { Issue } from "../IssuesTable/types";

const PageContent = styled.div`
  flex: 1;
  max-width: var(--content-width);
  width: 100%;
  padding: 4rem var(--side-padding);
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 2rem;

  @media screen and (max-width: 760px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }
`;

const Table = styled.div`
  grid-column: 1;

  @media screen and (max-width: 760px) {
    grid-column: unset;
    grid-row: 2;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 2rem;
`;

const Aside = styled.aside`
  grid-column: 2;

  @media screen and (max-width: 760px) {
    grid-column: unset;
    grid-row: 1;
  }
`;

const Bookmarks = styled.div`
  box-shadow: 0 4px 12px 2px rgba(32, 33, 37, 0.06);
  border: 1px solid var(--border-color);
  border-radius: 1rem;
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

  bookmarkedIssues: Array<BookmarkedIssue> | undefined;
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
  bookmarkedIssues,
}: Props) => {
  return (
    <PageContent>
      <Title>
        <FormattedMessage id={getMessageId("issues-table.title")} />
      </Title>
      <Grid>
        <Table>
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
        </Table>

        <Aside>
          <Bookmarks>
            <BookmarkedIssues issues={bookmarkedIssues} />
          </Bookmarks>
        </Aside>
      </Grid>
    </PageContent>
  );
};

export { IssuesView };
