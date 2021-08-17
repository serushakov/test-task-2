import { FormattedDate, FormattedMessage } from "react-intl";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { parseToHsl } from "polished";
import { omit } from "lodash";

import { Header } from "../components/Header";
import { useFetch } from "../hooks/useFetch";
import { getMessageId } from "../i18n/getMessageId";
import { octokitClient } from "../octokitClient";
import { getTotalPagesFromLink } from "../utils";
import { Comment } from "../components/Comment/Comment";

const PageContent = styled.div`
  flex: 1;
  max-width: var(--content-width);
  width: 100%;
  padding: 4rem var(--side-padding);
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const IssueNumber = styled.span`
  color: rgba(32, 33, 37, 0.6);
  margin-inline-start: 0.5rem;
`;

const IssueInfoRow = styled.p`
  color: rgba(32, 33, 37, 0.64);
  margin-bottom: 1.5rem;
`;

const Avatar = styled.img`
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 50%;
  margin-inline-end: 0.25rem;
  vertical-align: text-bottom;
`;

const Username = styled.a`
  text-decoration: none;
  color: var(--text-color);

  &:hover {
    color: var(--primary-color);
  }
`;

const Labels = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Label = styled.p<{ color: string | undefined }>`
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-weight: bold;
  background-color: ${({ color }) => `#${color}` ?? "var(--warning-color)"};

  /* picks text color that will contrast nicely with the color */
  color: ${({ color }) =>
    color && parseToHsl(`#${color}`).lightness < 0.5
      ? "#ffffff"
      : "var(--text-color)"}};
`;

const Comments = styled.div`
  margin-top: 2rem;
`;

const IssueView = ({
  match: {
    params: { number, organization, repository },
  },
}: RouteComponentProps<{
  organization: string;
  repository: string;
  number: string;
}>) => {
  const { data: issue } = useFetch(
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

  const { data: comments } = useFetch(
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

  return (
    <>
      <Header />
      <PageContent>
        <Title>
          {issue?.title}
          <IssueNumber>#{number}</IssueNumber>
        </Title>

        <IssueInfoRow>
          <FormattedMessage
            id={getMessageId("issue-view.created-by")}
            values={{
              author: (
                <Username href={issue?.user?.html_url} target="_blank">
                  <Avatar src={issue?.user?.avatar_url} />
                  {issue?.user?.login}
                </Username>
              ),
              date: (
                <FormattedDate
                  value={issue?.created_at}
                  month="long"
                  year="numeric"
                  day="numeric"
                  weekday="short"
                />
              ),
            }}
          />
        </IssueInfoRow>
        <Labels>
          {issue?.labels.map((label) => (
            <Label
              key={typeof label === "string" ? label : label.id}
              color={
                typeof label === "string" ? undefined : label.color ?? undefined
              }
            >
              {typeof label === "string" ? label : label.name}
            </Label>
          ))}
        </Labels>
        <Comments>
          {comments?.comments.map(
            (comment) =>
              comment.body && (
                <Comment
                  key={comment.id}
                  avatarImgUrl={comment.user?.avatar_url}
                  username={comment.user?.login}
                  createdAt={comment.created_at}
                  body={comment.body}
                  userLink={comment.user?.html_url}
                  reactions={
                    comment.reactions &&
                    omit(comment.reactions, "url", "total_count")
                  }
                />
              )
          )}
        </Comments>
      </PageContent>
    </>
  );
};

export { IssueView };
