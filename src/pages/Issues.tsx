import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { Octokit } from "octokit";

import { Header } from "../components/Header";
import { useFetch } from "../hooks/useFetch";
import { useEffect } from "react";

const octokitClient = new Octokit();

const PageContent = styled.div`
  flex: 1;
  max-width: var(--content-width);
  width: 100%;
  padding: 0 var(--side-padding);
  margin: 0 auto;

  display: flex;
  justify-content: center;
  align-items: center; ;
`;

const links = [{ label: "Choose another repository", to: { pathname: "/" } }];

type Props = RouteComponentProps<{
  organization: string;
  repository: string;
}>;

const Issues = ({
  match: {
    params: { organization, repository },
  },
}: Props) => {
  const { data } = useFetch(["issues", organization, repository], async () => {
    const { data } = await octokitClient.rest.issues.listForRepo({
      owner: organization,
      repo: repository,
      state: "open",
    });

    return data;
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <Header links={links} />
      <PageContent>
        {data?.map(({ title }) => {
          return <div>{`${title}\n`}</div>;
        })}
      </PageContent>
    </>
  );
};

export { Issues };
