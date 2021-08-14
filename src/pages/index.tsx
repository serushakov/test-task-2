import { useState } from "react";
import styled from "styled-components";
import { Octokit } from "octokit";
import { Link } from "react-router-dom";

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

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  &:disabled {
    background: rgba(32, 33, 37, 0.12);
  }
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

const Select = styled.select`
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
`;

const Button = styled(Link)`
  width: fit-content;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  background-color: var(--primary-color);
  color: #ffffff;
  text-decoration: none;
  text-align: center;
  font-weight: 600;

  align-self: center;
`;

const LandingPage = () => {
  const [organization, setOrganization] = useState("");
  const [repository, setRepository] = useState<string>();

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

          <InputContainer>
            <Label>Repository</Label>
            <Select
              disabled={typeof data === "undefined"}
              onChange={(event) => setRepository(event.target.value)}
              value={repository}
            >
              <option disabled selected>
                Select repository...
              </option>

              {data?.map((repository) => (
                <option key={repository.id} value={repository.name}>
                  {repository.name}
                </option>
              ))}
            </Select>
          </InputContainer>

          {organization && repository && (
            <Button
              aria-live="polite"
              to={{
                pathname: `/${organization}/${repository}`,
              }}
            >
              Browse Issues
            </Button>
          )}
        </Form>
      </PageContent>
    </>
  );
};

export { LandingPage };
