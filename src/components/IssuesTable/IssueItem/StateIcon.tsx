import { SVGProps } from "react";
import { Book, BookOpen } from "react-feather";
import styled, { css } from "styled-components";

const iconStyle = css`
  width: 1.5rem;
  height: 1.5rem;
`;

const StyledBookOpen = styled(BookOpen)`
  ${iconStyle}

  color: var(--success-color);
`;

const StyledBook = styled(Book)`
  ${iconStyle}

  color: var(--error-color);
`;

interface Props extends SVGProps<SVGSVGElement> {
  state: string;
}

const StateIcon = ({ state, ...rest }: Props) => {
  switch (state) {
    case "open":
      return <StyledBookOpen aria-label="Open" {...rest} />;
    case "closed":
      return <StyledBook aria-label="Closed" {...rest} />;
    default:
      return null;
  }
};

export { StateIcon };
