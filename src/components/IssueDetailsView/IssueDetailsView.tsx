import { FormattedDate, FormattedMessage, useIntl } from "react-intl";
import styled from "styled-components";
import { parseToHsl } from "polished";
import { ArrowLeft, Bookmark, Loader } from "react-feather";
import { LocationDescriptor } from "history";
import { Link } from "react-router-dom";

import { ReactionType, User } from "../../common";
import { getMessageId } from "../../i18n/getMessageId";
import { Comment } from "../Comment/Comment";
import { Pagination } from "../Pagination";
import { MarkdownRenderer } from "../MarkdownRenderer";

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

const BackLink = styled(Link)`
  text-decoration: none;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 2rem;
  width: fit-content;

  &:hover {
    color: var(--primary-color);
  }
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
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

const Body = styled.div`
  border: 1px solid var(--border-color);
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
  box-shadow: 0 4px 8px rgba(32, 33, 37, 0.06);
`;

const EmptyBodyContent = styled.p`
  font-style: italic;
  color: rgba(32, 33, 37, 0.64);
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

const PaginationSlot = styled.div`
  margin-top: 2rem;
  display: flex;
  width: 100%;
  justify-content: center;
`;

const BookmarkButton = styled.button<{ isBookmarked: boolean }>`
  padding: 0.5rem;

  color: ${({ isBookmarked }) =>
    isBookmarked ? "var(--warning-color)" : "var(--text-color)"};
`;

interface Props {
  issueNumber: string;
  title: string | undefined;
  user: User | undefined;
  createdAt: string | undefined;
  body?: string | null;
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
  page: number;
  totalPages: number | undefined;
  pageLinkCreator: (page: number) => LocationDescriptor;
  backLink: LocationDescriptor;
  isBookmarked: boolean;
  onBookmarkClick: () => void;
}

const IssueDetailsView = ({
  issueNumber,
  title,
  user,
  createdAt,
  labels,
  comments,
  isLoading,
  isLoadingComments,
  page,
  pageLinkCreator,
  totalPages,
  backLink,
  onBookmarkClick,
  isBookmarked,
  body,
}: Props) => {
  const intl = useIntl();

  if (isLoading || !title) {
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
      <BackLink to={backLink}>
        <ArrowLeft size="16" />
        <FormattedMessage id={getMessageId("issue-view.back-link-label")} />
      </BackLink>

      <TitleRow>
        <Title>
          {title}
          <IssueNumber>#{issueNumber}</IssueNumber>
        </Title>

        <BookmarkButton
          isBookmarked={isBookmarked}
          onClick={onBookmarkClick}
          aria-label={intl.formatMessage({
            id: getMessageId("issue-view.bookmark-button-label"),
          })}
        >
          <Bookmark size="32" fill={isBookmarked ? "currentColor" : "none"} />
        </BookmarkButton>
      </TitleRow>
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

      <Body>
        {body ? (
          <MarkdownRenderer source={body} />
        ) : (
          <EmptyBodyContent>
            <FormattedMessage id={getMessageId("issue-view.empty-body")} />
          </EmptyBodyContent>
        )}
      </Body>

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
      {comments && totalPages !== undefined && totalPages > 1 && (
        <PaginationSlot>
          <Pagination
            page={page}
            pageLinkCreator={pageLinkCreator}
            pages={totalPages}
          />
        </PaginationSlot>
      )}
    </PageContent>
  );
};

export { IssueDetailsView };
