import { RouteComponentProps } from "react-router-dom";
import { omit } from "lodash";

import { Header } from "../components/Header";
import { useFetch } from "../hooks/useFetch";
import { octokitClient } from "../octokitClient";
import { getTotalPagesFromLink, isDefined } from "../utils";
import { IssueView } from "../components/IssueView";

const IssueDetailsPage = ({
  match: {
    params: { number, organization, repository },
  },
}: RouteComponentProps<{
  organization: string;
  repository: string;
  number: string;
}>) => {
  const { data: issue, loading } = useFetch(
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

  const { data, loading: loadingComments } = useFetch(
    ["issue-comments", organization, repository, number],
    async () => {
      const {
        data: comments,
        headers: { link },
      } = await octokitClient.rest.issues.listComments({
        owner: organization,
        repo: repository,
        issue_number: Number(number),
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
        isLoading={loading}
        isLoadingComments={loadingComments}
        issueNumber={number}
        createdAt={issue?.created_at}
        title={issue?.title}
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
