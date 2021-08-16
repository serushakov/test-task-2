import { LocationDescriptor } from "history";
import { ArrowLeft, ArrowRight } from "react-feather";
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
  page: number
): Array<ItemType> => {
  const pageOptionsToShow = 5;

  if (totalPages < 5) {
    return new Array(totalPages)
      .fill(undefined)
      .map((_, index) => ({ type: "page", number: index + 1 }));
  }

  if (page <= 4) {
    return [
      {
        type: "page",
        number: 1,
      },
      {
        type: "page",
        number: 2,
      },
      {
        type: "page",
        number: 3,
      },
      {
        type: "page",
        number: 4,
      },
      {
        type: "page",
        number: 5,
      },
      { type: "divider" },
      { type: "page", number: totalPages },
    ];
  } else if (totalPages - page < 4) {
    return [
      {
        type: "page",
        number: 1,
      },
      { type: "divider" },
      ...new Array(pageOptionsToShow).fill(undefined).map((_, index) => ({
        type: "page" as const,
        number: totalPages - (pageOptionsToShow - index - 1),
      })),
    ];
  } else {
    return [
      {
        type: "page",
        number: 1,
      },
      { type: "divider" },
      ...new Array(pageOptionsToShow).fill(undefined).map((_, index) => ({
        type: "page" as const,
        number: page - (2 - index),
      })),
      { type: "divider" },
      {
        type: "page",
        number: totalPages,
      },
    ];
  }
};

const Pagination = ({ pages, page, pageLinkCreator }: Props) => {
  return (
    <Root>
      <ArrowLeft />
      <ArrowRight />
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
    </Root>
  );
};

export { Pagination };
