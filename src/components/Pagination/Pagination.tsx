import { LocationDescriptor } from "history";
import { ArrowLeft, ArrowRight } from "react-feather";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useMedia } from "../../hooks/useMedia";

import { createArray } from "../../utils";

const Root = styled.nav`
  display: flex;
  align-items: center;
`;

const List = styled.ul`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
`;

const PageLink = styled(Link)<{ selected: boolean }>`
  padding: 0.75rem;
  display: block;
  text-align: center;
  color: ${({ selected }) =>
    selected ? "var(--text-color)" : "rgba(32,33,37, 0.8)"};
  text-decoration: none;

  font-weight: ${({ selected }) => (selected ? "bold" : "normal")};

  &:hover {
    color: var(--primary-color);
  }

  @media screen and (max-width: 475px) {
    padding: 0.5rem;
  }
`;

const BoxWrapper = styled.li`
  flex: 1 0 2rem;
  border: 0 solid var(--border-color);
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-inline-end-width: 1px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:first-of-type {
    border-start-start-radius: 0.5rem;
    border-end-start-radius: 0.5rem;
    border-inline-start-width: 1px;
  }

  &:last-of-type {
    border-start-end-radius: 0.5rem;
    border-end-end-radius: 0.5rem;
  }
`;

const Divider = styled.div`
  padding: 0.75rem;
  @media screen and (max-width: 475px) {
    padding: 0.5rem;
  }
`;

const PrevNextLink = styled(Link)<{ disabled: boolean }>`
  padding: 0.75rem;
  @media screen and (max-width: 475px) {
    padding: 0.5rem;
  }
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  color: ${({ disabled }) =>
    disabled ? "rgba(32,33,37, 0.4)" : "var(--text-color)"};

  &:hover {
    ${({ disabled }) => !disabled && "color: var(--primary-color)"};
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
  currentPage: number,
  pageOptionsToShow: number
): Array<ItemType> => {
  const firstPage = 1;
  const lastPage = totalPages;

  if (totalPages <= pageOptionsToShow) {
    return createArray(totalPages).map((_, index) => ({
      type: "page",
      number: index + 1,
    }));
  }

  // When current page is close to start
  if (currentPage <= pageOptionsToShow) {
    return [
      ...createArray(pageOptionsToShow + 2).map((_, index) => ({
        type: "page" as const,
        number: index + 1,
      })),
      { type: "divider" },
      { type: "page", number: totalPages },
    ];

    // When current page is close to end
  } else if (totalPages - currentPage < pageOptionsToShow) {
    return [
      {
        type: "page",
        number: 1,
      },
      { type: "divider" },
      ...createArray(pageOptionsToShow + 2).map((_, index) => ({
        type: "page" as const,
        number: totalPages - (pageOptionsToShow - index + 1),
      })),
    ];

    // When current page is somewhere between
  } else {
    return [
      {
        type: "page",
        number: firstPage,
      },
      { type: "divider" },
      ...createArray(pageOptionsToShow).map((_, index) => ({
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
  const isPrevDisabled = page === 1;
  const isNextDisabled = page === pages;

  const pageOptionsToShow = useMedia("screen and (max-width: 475px)") ? 3 : 5;

  return (
    <Root>
      <PrevNextLink
        to={pageLinkCreator(Math.max(page - 1, 0))}
        disabled={isPrevDisabled}
        onClick={(e) => isPrevDisabled && e.preventDefault()}
      >
        <ArrowLeft />
      </PrevNextLink>
      <List>
        {getPagesToDisplay(pages, page, pageOptionsToShow).map(
          (item, index) => {
            switch (item.type) {
              case "page":
                return (
                  <BoxWrapper key={`${item.type}-${item.number}`}>
                    <PageLink
                      selected={item.number === page}
                      to={pageLinkCreator(item.number)}
                    >
                      {item.number}
                    </PageLink>
                  </BoxWrapper>
                );
              case "divider":
                return (
                  <BoxWrapper key={`divider-${index}`}>
                    <Divider>?????????</Divider>
                  </BoxWrapper>
                );
            }
            return null;
          }
        )}
      </List>
      <PrevNextLink
        to={pageLinkCreator(Math.min(page + 1, pages))}
        disabled={isNextDisabled}
        onClick={(e) => isNextDisabled && e.preventDefault()}
      >
        <ArrowRight />
      </PrevNextLink>
    </Root>
  );
};

export { Pagination };
