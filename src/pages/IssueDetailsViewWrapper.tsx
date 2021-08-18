import { useEffect } from "react";
import { useIntl } from "react-intl";
import { RouteComponentProps } from "react-router-dom";
import { omit } from "lodash";

import { Header } from "../components/Header";
import { useFetch } from "../hooks/useFetch";
import { octokitClient } from "../octokitClient";
import { constructIssueUrl, getTotalPagesFromLink, isDefined } from "../utils";
import { IssueDetailsView } from "../components/IssueDetailsView";
import { useNumericSearchParam } from "../hooks/useNumericSearchParam";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { BookmarkedIssue } from "../common";

const IssueDetailsViewWrapper = ({
  match: {
    params: { number, organization, repository },
  },
  history: { action },
  location: { search, state },
}: RouteComponentProps<
  {
    organization: string;
    repository: string;
    number: string;
  },
  any,
  { search: string }
>) => {
  const intl = useIntl();
  const page = useNumericSearchParam("page", search, 1);

  useEffect(() => {
    // Restoring window scroll if user changes the page
    // Does not touch scroll if user navigates back, so that
    // browser figures out scoll position itself
    if (action === "PUSH") {
      window.scrollTo(0, 0);
    }
  }, [action, page]);

  const { data: issue, isLoading } = useFetch(
    ["issue", organization, repository, number],
    async () => {
      const { data: issue } = await octokitClient.rest.issues.get({
        owner: organization,
        repo: repository,
        issue_number: Number(number),
      });

      return issue;
    }
  );

  const { data, isLoading: loadingComments } = useFetch(
    ["issue-comments", organization, repository, number, page],
    async () => {
      const {
        data: comments,
        headers: { link },
      } = await octokitClient.rest.issues.listComments({
        owner: organization,
        repo: repository,
        issue_number: Number(number),
        page,
        headers: {
          // Adds reactions to comments 🔥
          accept: "application/vnd.github.squirrel-girl-preview",
        },
      });

      const totalCommentsPages = link ? getTotalPagesFromLink(link) : 0;

      return { comments, totalCommentsPages };
    }
  );

  const [bookmarkedIssues, setBookmarkedIssues] =
    useLocalStorage<Array<BookmarkedIssue>>("bookmarked_issues");

  const isBookmarked = bookmarkedIssues
    ? bookmarkedIssues.some((issue) => issue.number === number)
    : false;

  return (
    <>
      <Header
        links={[
          {
            label: intl.formatMessage({ id: "header.switch-repo-link" }),
            to: { pathname: "/" },
          },
        ]}
      />
      <IssueDetailsView
        body={issue?.body}
        isBookmarked={isBookmarked}
        onBookmarkClick={() =>
          issue &&
          setBookmarkedIssues(
            isBookmarked
              ? bookmarkedIssues?.filter(
                  (issue) =>
                    issue.link !==
                    constructIssueUrl(organization, repository, number)
                ) ?? null
              : [
                  ...(bookmarkedIssues ?? []),
                  {
                    name: issue.title,
                    number: number,
                    link: constructIssueUrl(organization, repository, number),
                  },
                ]
          )
        }
        backLink={{
          pathname: `/${organization}/${repository}`,
          search: state?.search,
        }}
        isLoading={isLoading}
        isLoadingComments={loadingComments}
        issueNumber={number}
        createdAt={issue?.created_at}
        title={issue?.title}
        page={page}
        totalPages={data?.totalCommentsPages}
        pageLinkCreator={(page) => ({ search: `page=${page}` })}
        labels={issue?.labels
          .map((label) =>
            typeof label === "string"
              ? label
              : label.name
              ? {
                  color: label.color ?? undefined,
                  id: label.id,
                  name: label.name,
                }
              : undefined
          )
          .filter(isDefined)}
        user={
          (issue?.user && {
            login: issue.user.login,
            avatarUrl: issue.user.avatar_url,
            url: issue.user.html_url,
          }) ??
          undefined
        }
        comments={data?.comments
          .filter(
            // Filter out comments that don't have body
            // Most of the comments should have a body
            <T extends { body?: string }>(
              comment: T
            ): comment is T & { body: string } => comment.body !== undefined
          )
          .map(({ body, id, created_at, user, reactions }) => ({
            body,
            createdAt: created_at,
            id,
            user:
              (user && {
                login: user.login,
                avatarUrl: user.avatar_url,
                url: user.html_url,
              }) ??
              undefined,
            reactions: reactions && omit(reactions, "url", "total_count"),
          }))}
      />
    </>
  );
};

export { IssueDetailsViewWrapper };
