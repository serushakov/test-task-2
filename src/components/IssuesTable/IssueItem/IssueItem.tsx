import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { StateIcon } from "./StateIcon";
import { MessageSquare } from "react-feather";

import { Issue } from "../types";

const Title = styled(Link)`
  text-decoration: none;
  color: var(--text-color);
`;

const Root = styled.div`
  cursor: pointer;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: min-content auto min-content;
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
`;

const Description = styled.div`
  font-size: 0.875rem;
  color: rgba(32, 33, 37, 0.8);
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

const IssueItem = ({ link, title, author, state, number, comments }: Issue) => {
  const history = useHistory();
  const handleClick = () => history.push(link);

  return (
    <Root onClick={handleClick}>
      <StateIcon state={state} />
      <TitleDescription>
        <Title to={link}>{title}</Title>
        <Description>{`#${number} opened by ${author}`}</Description>
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
