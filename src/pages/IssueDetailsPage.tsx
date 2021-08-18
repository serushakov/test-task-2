import { RouteComponentProps } from "react-router-dom";
import { omit } from "lodash";

import { Header } from "../components/Header";
import { useFetch } from "../hooks/useFetch";
import { octokitClient } from "../octokitClient";
import { getTotalPagesFromLink, isDefined } from "../utils";
import { IssueView } from "../components/IssueView";
import { useNumericSearchParam } from "../hooks/useNumericSearchParam";
import { useEffect } from "react";

const IssueDetailsPage = ({
  match: {
    params: { number, organization, repository },
  },
  history: { action },
  location: { search },
}: RouteComponentProps<{
  organization: string;
  repository: string;
  number: string;
}>) => {
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

  data?.comments.forEach(
    (comment) => !comment.body && console.log("FOUND ONE!!!!!!!!", comment)
  );

  return (
    <>
      <Header />
      <IssueView
        backLink={`/${organization}/${repository}`}
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
            url: issue.user.avatar_url,
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
                url: user.avatar_url,
              }) ??
              undefined,
            reactions: reactions && omit(reactions, "url", "total_count"),
          }))}
      />
    </>
  );
};

export { IssueDetailsPage };
