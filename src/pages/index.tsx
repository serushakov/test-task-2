import { useState } from "react";
import styled from "styled-components";
import { Octokit } from "octokit";
import { Link } from "react-router-dom";
import { Loader, X } from "react-feather";

import { Header } from "../components/Header";
import { useFetch } from "../hooks/useFetch";
import { Select } from "../components/Select";

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
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 12px 2px rgba(32, 33, 37, 0.06);

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

const InputFieldWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
  width: 100%;
`;

const StyledLoader = styled(Loader)`
  position: absolute;
  top: 50%;
  inset-inline-end: 0.5rem;
  transform: translate(0, -50%);
  animation: rotate forwards 1s linear infinite, appear forwards 0.15s;

  @keyframes appear {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes rotate {
    0% {
      transform: translate(0, -50%) rotate(0deg);
    }

    100% {
      transform: translate(0, -50%) rotate(360deg);
    }
  }
`;

const ErrorIcon = styled(X)`
  position: absolute;
  top: 50%;
  inset-inline-end: 0.5rem;
  transform: translate(0, -50%);
  color: var(--error-color);

  animation: shake forwards 0.5s ease-in-out;

  @keyframes shake {
    0%,
    100% {
      transform: translate(0, -50%) rotate(0);
    }

    15%,
    45%,
    75% {
      transform: translate(3px, -50%);
    }

    30%,
    60%,
    90% {
      transform: translate(-3px, -50%);
    }
  }
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

      const { data } = await octokitClient.rest.repos.listForOrg({
        org: organization,
      });

      return data;
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

            <InputFieldWrapper>
              <Input
                id="organization-input"
                type="text"
                value={organization}
                onChange={(event) => setOrganization(event.currentTarget.value)}
              />
              {loading && <StyledLoader />}
              {!loading && error && <ErrorIcon />}
            </InputFieldWrapper>
          </InputContainer>

          <InputContainer>
            <Label>Repository</Label>
            <Select
              disabled={typeof data === "undefined"}
              onChange={setRepository}
              value={repository}
              options={
                data?.map((repo) => ({
                  value: repo.name,
                  label: repo.name,
                })) ?? []
              }
            />
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
