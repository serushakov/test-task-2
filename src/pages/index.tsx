import { useState } from "react";
import styled from "styled-components";
import { Octokit } from "octokit";

import { Header } from "../components/Header";
import { useFetch } from "../hooks/useFetch";

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

const Form = styled.div`
  flex: 1;

  max-width: 30rem;
  border: 1px solid var(--border-color);
  border-radius: 1rem;
  padding: 2rem;

  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
`;

const LandingPage = () => {
  const [organization, setOrganization] = useState("");

  const { data, loading, error } = useFetch(
    ["orgRepositories", organization],
    async () => {
      if (organization.length < 3) return;

      return octokitClient.rest.repos
        .listForOrg({ org: organization })
        .then((response) => response.data);
    },
    {
      debounce: 500,
    }
  );

  return (
    <>
      <Header />
      <PageContent>
        <Form>
          <Title>Details</Title>
          <InputContainer>
            <Label htmlFor="organization-input">Organization</Label>
            <Input
              id="organization-input"
              type="text"
              value={organization}
              onChange={(event) => setOrganization(event.currentTarget.value)}
            />
          </InputContainer>
        </Form>
      </PageContent>
    </>
  );
};

export { LandingPage };
