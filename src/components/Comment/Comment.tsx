import { FormattedDate, FormattedMessage } from "react-intl";
import styled from "styled-components";

import { getMessageId } from "../../i18n/getMessageId";

import { Body } from "./Body";
import { Reaction } from "./Reaction";
import { ReactionType } from "./types";

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

const User = styled.a`
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
  avatarImgUrl: string | undefined;
  createdAt: string;
  username: string | undefined;
  userLink: string | undefined;
  body: string;
  reactions: Record<ReactionType, number> | undefined;
}

const Comment = ({
  avatarImgUrl,
  body,
  username,
  userLink,
  reactions,
  createdAt,
}: Props) => {
  console.log(reactions);
  return (
    <Root>
      <User href={userLink} target="_blank">
        {avatarImgUrl ? (
          <Avatar src={avatarImgUrl} />
        ) : (
          <EmptyAvatar>?</EmptyAvatar>
        )}
        <UsernameDate>
          <Username>
            {username ?? (
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
      </User>

      <Bubble>
        <Body body={body} />
        <Reactions>
          {reactions &&
            Object.entries(reactions).map(
              ([type, amount]) =>
                amount > 0 && (
                  <Reaction type={type as ReactionType} amount={amount} />
                )
            )}
        </Reactions>
      </Bubble>
    </Root>
  );
};

export { Comment };
