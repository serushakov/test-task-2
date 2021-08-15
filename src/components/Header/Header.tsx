import { Link } from "react-router-dom";
import { LocationDescriptorObject } from "history";
import styled from "styled-components";

const Root = styled.header`
  height: 4rem;
  box-shadow: 0 2px 4px rgba(32, 33, 37, 0.06);
`;

const WidthContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: var(--content-width);
  margin: auto;
  padding: 0 var(--side-padding);

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.span`
  font-size: 2rem;
  font-weight: bold;
`;

const Links = styled.nav`
  display: flex;
  gap: 0.5rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--primary-color);
  font-weight: 600;
`;

type LinkData = {
  label: string;
  to: LocationDescriptorObject;
};

interface Props {
  links?: Array<LinkData>;
}

const Header = ({ links }: Props) => {
  return (
    <Root>
      <WidthContainer>
        <Logo>HubGit</Logo>

        {links && (
          <Links>
            {links.map((link) => (
              <StyledLink key={link.label} to={link.to}>
                {link.label}
              </StyledLink>
            ))}
          </Links>
        )}
      </WidthContainer>
    </Root>
  );
};

export { Header };
