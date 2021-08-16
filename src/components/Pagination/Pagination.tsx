import { LocationDescriptor } from "history";
import { ArrowLeft, ArrowRight } from "react-feather";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ReactPaginate from "react-paginate";

const Root = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const List = styled.ul`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
`;

const PageLink = styled(Link)<{ selected: boolean }>`
  color: ${({ selected }) =>
    selected ? "var(--text-color)" : "rgba(32,33,37, 0.8)"};
  text-decoration: none;

  font-weight: ${({ selected }) => (selected ? 600 : "normal")};

  &:hover {
    color: var(--primary-color);
  }
`;

interface Props {
  pages: number;
  page: number;
  pageLinkCreator: (page: number) => LocationDescriptor;
}

type ItemType =
  | {
      type: "page";
      number: number;
    }
  | {
      type: "divider";
    };

const getPagesToDisplay = (
  totalPages: number,
  currentPage: number
): Array<ItemType> => {
  const pageOptionsToShow = 5;
  const firstPage = 1;
  const lastPage = totalPages;

  if (totalPages <= pageOptionsToShow) {
    return new Array(totalPages)
      .fill(undefined)
      .map((_, index) => ({ type: "page", number: index + 1 }));
  }

  if (currentPage <= pageOptionsToShow) {
    return [
      ...new Array(pageOptionsToShow + 1).fill(undefined).map((_, index) => ({
        type: "page" as const,
        number: index + 1,
      })),
      { type: "divider" },
      { type: "page", number: totalPages },
    ];
  } else if (totalPages - currentPage < pageOptionsToShow) {
    return [
      {
        type: "page",
        number: 1,
      },
      { type: "divider" },
      ...new Array(pageOptionsToShow + 1).fill(undefined).map((_, index) => ({
        type: "page" as const,
        number: totalPages - (pageOptionsToShow - index),
      })),
    ];
  } else {
    return [
      {
        type: "page",
        number: firstPage,
      },
      { type: "divider" },
      ...new Array(pageOptionsToShow).fill(undefined).map((_, index) => ({
        type: "page" as const,
        number: currentPage - (Math.floor(pageOptionsToShow / 2) - index),
      })),
      { type: "divider" },
      {
        type: "page",
        number: lastPage,
      },
    ];
  }
};

const Pagination = ({ pages, page, pageLinkCreator }: Props) => {
  return (
    <Root>
      <ArrowLeft />
      <List>
        {getPagesToDisplay(pages, page).map((item, index) => {
          switch (item.type) {
            case "page":
              return (
                <li key={`${item.type}-${item.number}`}>
                  <PageLink
                    selected={item.number === page}
                    to={pageLinkCreator(item.number)}
                  >
                    {item.number}
                  </PageLink>
                </li>
              );
            case "divider":
              return <li key={`divider-${index}`}>...</li>;
          }
        })}
      </List>
      <ArrowRight />
    </Root>
  );
};

export { Pagination };
