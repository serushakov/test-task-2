import { FormattedMessage } from "react-intl";
import styled from "styled-components";

import { BookmarkedIssue } from "../../common";
import { getMessageId } from "../../i18n/getMessageId";
import { Issue } from "./Issue";

const Root = styled.div`
  height: fit-content;
  padding: 1.25rem;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const EmptyList = styled.p`
  font-style: italic;
  color: rgba(32, 33, 37, 0.64);
`;

const List = styled.ul`
  list-style: circle;
  margin-inline-start: 1rem;
`;

const ListItem = styled.li`
  & + & {
    margin-top: 0.5rem;
  }
`;

interface Props {
  issues: Array<BookmarkedIssue> | undefined;
}

const BookmarkedIssues = ({ issues }: Props) => {
  return (
    <Root>
      <Title>
        <FormattedMessage id={getMessageId("bookmarked-issues.title")} />
      </Title>
      {issues ? (
        <nav>
          <List>
            {issues.map(({ link, name, number }) => (
              <ListItem key={name + number}>
                <Issue link={link} name={name} number={number} />
              </ListItem>
            ))}
          </List>
        </nav>
      ) : (
        <EmptyList>
          <FormattedMessage
            id={getMessageId("bookmarked-issues.empty-message")}
          />
        </EmptyList>
      )}
    </Root>
  );
};

export { BookmarkedIssues };
