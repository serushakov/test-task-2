import { LocationDescriptor, LocationDescriptorObject } from "history";
import { IssueStateFilter } from "../../common";
import { Pagination } from "../Pagination";

const ISSUE_STATES = [
  IssueStateFilter.open,
  IssueStateFilter.closed,
  IssueStateFilter.all,
];

type Issue = {
  title: string;
  state: string;
  id: number;
  author: string;
  number: number;
  comments: number;
  link: LocationDescriptorObject;
};

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
    <div>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>
            {issue.title} by {issue.author}
          </li>
        ))}
      </ul>
      <Pagination page={page} pages={pages} pageLinkCreator={pageLinkCreator} />
    </div>
  );
};

export { IssuesTable };
