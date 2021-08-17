import styled from "styled-components";
import Markdown from "react-markdown";
import { FormattedMessage } from "react-intl";
import { getMessageId } from "../../i18n/getMessageId";

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
  gap: 0.5rem;
  align-items: center;
  text-decoration: none;
  color: var(--text-color);

  &:hover {
    color: var(--primary-color);
  }
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
  white-space: pre-wrap;
  position: relative;

  margin-top: 1rem;
  border: 1px solid var(--border-color);

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

interface Props {
  avatarImgUrl: string | undefined;
  createdAt: string;
  username: string | undefined;
  userLink: string | undefined;
  body: string;
}

const Comment = ({ avatarImgUrl, body, username, userLink }: Props) => {
  return (
    <Root>
      <User href={userLink} target="_blank">
        {avatarImgUrl ? (
          <Avatar src={avatarImgUrl} />
        ) : (
          <EmptyAvatar>?</EmptyAvatar>
        )}
        <Username>
          {username ?? (
            <FormattedMessage
              id={getMessageId("issue-view.comment.unknown-user")}
            />
          )}
        </Username>
      </User>

      <Bubble>
        <Markdown>{body}</Markdown>
      </Bubble>
    </Root>
  );
};

export { Comment };
