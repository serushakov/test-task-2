import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";

import { Header } from "../components/Header";
import { useFetch } from "../hooks/useFetch";
import { octokitClient } from "../octokitClient";
import { getTotalPagesFromLink } from "../utils";

const PageContent = styled.div`
  flex: 1;
  max-width: var(--content-width);
  width: 100%;
  padding: 4rem var(--side-padding);
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
`;

const IssueView = ({
  match: {
    params: { number, organization, repository },
  },
}: RouteComponentProps<{
  organization: string;
  repository: string;
  number: string;
}>) => {
  const { data: issue } = useFetch(
    ["issue", organization, repository, number],
    async () => {
      const { data: issue } = await octokitClient.rest.issues.get({
        owner: organization,
        repo: repository,
        issue_number: Number(number),
      });

      return issue;
    }
  );

  const { data: comments } = useFetch(
    ["issue-comments", organization, repository, number],
    async () => {
      const {
        data: comments,
        headers: { link },
      } = await octokitClient.rest.issues.listComments({
        owner: organization,
        repo: repository,
        issue_number: Number(number),
      });

      const totalCommentsPages = link ? getTotalPagesFromLink(link) : 0;

      return { comments, totalCommentsPages };
    }
  );

  console.log({ issue, comments });

  return (
    <>
      <Header />
      <PageContent>
        <Title>{issue?.title}</Title>
      </PageContent>
    </>
  );
};

export { IssueView };
