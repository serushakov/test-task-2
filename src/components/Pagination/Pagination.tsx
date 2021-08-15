import { LocationDescriptor } from "history";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Root = styled.nav`
  width: 100%;
`;

const List = styled.ul`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
`;

interface Props {
  pages: number;
  page: number;
  pageLinkCreator: (page: number) => LocationDescriptor;
}

const Pagination = ({ pages, page, pageLinkCreator }: Props) => {
  return (
    <Root>
      <List>
        {new Array(pages).fill(undefined).map((_, index) => (
          <li key={index}>
            <Link to={pageLinkCreator(index + 1)}>{index + 1}</Link>
          </li>
        ))}
      </List>
    </Root>
  );
};

export { Pagination };
