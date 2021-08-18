import { LocationDescriptor } from "history";
import { Link } from "react-router-dom";
import styled from "styled-components";

const IssueNumber = styled.span`
  color: rgba(32, 33, 37, 0.64);
  margin-inline-end: 0.5rem;
`;

const Root = styled(Link)`
  display: block;
  text-decoration: none;
  color: var(--text-color);

  &:hover {
    &,
    ${IssueNumber} {
      color: var(--primary-color);
    }
  }
`;

interface Props {
  name: string;
  number: string;
  link: LocationDescriptor;
}

const Issue = ({ name, number, link }: Props) => {
  return (
    <Root to={link}>
      <IssueNumber>#{number}</IssueNumber>
      {name}
    </Root>
  );
};

export { Issue };
