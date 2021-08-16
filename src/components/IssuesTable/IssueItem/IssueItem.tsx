import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { FormattedDate, FormattedMessage } from "react-intl";
import { MessageSquare } from "react-feather";

import { Issue } from "../types";
import { getMessageId } from "../../../i18n/getMessageId";

import { StateIcon } from "./StateIcon";

const Title = styled(Link)`
  text-decoration: none;
  color: var(--text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Root = styled.div`
  cursor: pointer;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  align-items: center;
  gap: 1rem;

  :hover {
    ${Title} {
      color: var(--primary-color);
    }
  }
`;

const TitleDescription = styled.div`
  padding: 0.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
  min-width: 0;
`;

const Description = styled.div`
  font-size: 0.875rem;
  color: rgba(32, 33, 37, 0.8);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Comments = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: rgba(32, 33, 37, 0.8);
`;

const StyledMessageSquare = styled(MessageSquare)`
  width: 1rem;
  height: 1rem;
`;

const IssueItem = ({
  link,
  title,
  author,
  state,
  number,
  comments,
  date,
  id,
}: Issue) => {
  const history = useHistory();
  const handleClick = () => history.push(link);

  const descriptionId = `${id}-description`;

  return (
    <Root onClick={handleClick}>
      <StateIcon state={state} />
      <TitleDescription>
        <Title to={link} aria-describedby={descriptionId}>
          {title}
        </Title>
        <Description id={descriptionId}>
          <FormattedMessage
            id={getMessageId("issues-table.issue.description")}
            values={{
              number,
              author,
              date: (
                <FormattedDate
                  value={date}
                  year="numeric"
                  day="numeric"
                  month="long"
                />
              ),
            }}
          />
        </Description>
      </TitleDescription>
      {comments > 0 && (
        <Comments>
          <span>{comments}</span>
          <StyledMessageSquare />
        </Comments>
      )}
    </Root>
  );
};

export { IssueItem };
