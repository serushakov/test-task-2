import { LocationDescriptorObject } from "history";
import { IssueStateFilter } from "../../common";

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
  onPageChange: (page: number) => void;
  pages: number;
  issues: Array<Issue>;
}

const IssuesTable = ({ issues, pages }: Props) => {
  return (
    <div>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>
            {issue.title} by {issue.author}
          </li>
        ))}
      </ul>

      <nav>
        <ul>
          {new Array(pages).fill(undefined).map((_, index) => (
            <li>{index + 1}</li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export { IssuesTable };
