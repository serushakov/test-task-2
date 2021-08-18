import { FormattedDate, FormattedMessage } from "react-intl";
import styled from "styled-components";
import { ReactionType, User } from "../../common";

import { getMessageId } from "../../i18n/getMessageId";
import { MarkdownRenderer } from "../MarkdownRenderer";

import { Reaction } from "./Reaction";

const Root = styled.div`
  display: flex;
  flex-direction: column;

  & + & {
    margin-top: 2rem;
  }
`;

const Avatar = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`;

const UserLink = styled.a`
  display: flex;
  width: fit-content;
  gap: 0.5rem;
  align-items: center;
  text-decoration: none;
  color: var(--text-color);

  &:hover {
    color: var(--primary-color);
  }
`;

const UsernameDate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Date = styled.div`
  color: rgba(32, 33, 37, 0.6);
  font-size: 0.75rem;
`;

const Username = styled.div`
  font-weight: 600;
`;

const EmptyAvatar = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: rgba(32, 33, 37, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Bubble = styled.div`
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(32, 33, 37, 0.06);
  padding: 1.5rem;
  padding-bottom: 1rem;
  white-space: pre-wrap;
  line-height: 1.2;
  position: relative;

  margin-top: 1rem;
  border: 1px solid var(--border-color);

  /* Arrow */
  &:after,
  &:before {
    bottom: 100%;
    left: 1rem;
    border: solid transparent;
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  &:after {
    border-color: rgba(255, 255, 255, 0);
    border-bottom-color: #ffffff;
    border-width: 8px;
    margin-left: -8px;
  }
  &:before {
    border-color: rgba(123, 143, 156, 0);
    border-bottom-color: var(--border-color);
    border-width: 10px;
    margin-left: -10px;
  }
`;

const Reactions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
`;

interface Props {
  user?: User;
  createdAt: string;
  body: string;
  reactions?: Record<ReactionType, number>;
}

const Comment = ({ body, user, reactions, createdAt }: Props) => {
  return (
    <Root>
      <UserLink href={user?.url} target="_blank">
        {user?.avatarUrl ? (
          <Avatar src={user.avatarUrl} />
        ) : (
          <EmptyAvatar>?</EmptyAvatar>
        )}
        <UsernameDate>
          <Username>
            {user?.login ?? (
              <FormattedMessage
                id={getMessageId("issue-view.comment.unknown-user")}
              />
            )}
          </Username>
          <Date>
            <FormattedDate
              value={createdAt}
              day="numeric"
              month="long"
              year="numeric"
              weekday="long"
            />
          </Date>
        </UsernameDate>
      </UserLink>

      <Bubble>
        <MarkdownRenderer source={body} />
        <Reactions>
          {reactions &&
            Object.entries(reactions).map(
              ([type, amount]) =>
                amount > 0 && (
                  <Reaction
                    key={type}
                    type={type as ReactionType}
                    amount={amount}
                  />
                )
            )}
        </Reactions>
      </Bubble>
    </Root>
  );
};

export { Comment };
