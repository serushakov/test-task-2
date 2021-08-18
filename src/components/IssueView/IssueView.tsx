import { FormattedDate, FormattedMessage } from "react-intl";
import styled from "styled-components";
import { parseToHsl } from "polished";

import { ReactionType, User } from "../../common";
import { getMessageId } from "../../i18n/getMessageId";
import { Comment } from "../Comment/Comment";
import { Loader } from "react-feather";

const PageContent = styled.div`
  flex: 1;
  max-width: var(--content-width);
  width: 100%;
  padding: 4rem var(--side-padding);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;
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

const Center = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLoader = styled(Loader)`
  width: 3rem;
  height: 3rem;
  color: rgba(32, 33, 37, 0.64);
  animation: rotate 1s linear infinite;
`;

interface Props {
  issueNumber: string;
  title: string | undefined;
  user: User | undefined;
  createdAt: string | undefined;
  labels:
    | Array<string | { id?: number; color?: string; name: string }>
    | undefined;
  comments?: Array<{
    id: number;
    user?: User;
    createdAt: string;
    body: string;
    reactions?: Record<ReactionType, number>;
  }>;
  isLoading: boolean;
  isLoadingComments: boolean;
}

const IssueView = ({
  issueNumber,
  title,
  user,
  createdAt,
  labels,
  comments,
  isLoading,
  isLoadingComments,
}: Props) => {
  if (isLoading) {
    return (
      <PageContent>
        <Center>
          <StyledLoader />
        </Center>
      </PageContent>
    );
  }

  return (
    <PageContent>
      <Title>
        {title}
        <IssueNumber>#{issueNumber}</IssueNumber>
      </Title>

      <IssueInfoRow>
        <FormattedMessage
          id={getMessageId("issue-view.created-by")}
          values={{
            author: (
              <Username href={user?.url} target="_blank">
                <Avatar src={user?.avatarUrl} />
                {user?.login ?? (
                  <FormattedMessage
                    id={getMessageId("issue-view.comment.unknown-user")}
                  />
                )}
              </Username>
            ),
            date: (
              <FormattedDate
                value={createdAt}
                month="long"
                year="numeric"
                day="numeric"
                weekday="short"
              />
            ),
          }}
        />
      </IssueInfoRow>
      {labels && (
        <Labels>
          {labels.map((label) => (
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
      )}

      {isLoadingComments && (
        <Center>
          <StyledLoader />
        </Center>
      )}
      {!isLoadingComments && comments && (
        <Comments>
          {comments.map(
            (comment) =>
              comment.body && (
                <Comment
                  key={comment.id}
                  user={comment.user}
                  createdAt={comment.createdAt}
                  body={comment.body}
                  reactions={comment.reactions}
                />
              )
          )}
        </Comments>
      )}
    </PageContent>
  );
};

export { IssueView };
