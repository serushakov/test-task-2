import { RouteComponentProps } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { octokitClient } from "../octokitClient";

const IssueView = ({
  match: {
    params: { number, organization, repository },
  },
}: RouteComponentProps<{
  organization: string;
  repository: string;
  number: string;
}>) => {
  const { data } = useFetch(
    ["issue", organization, repository, number],
    async () => {
      const response = await octokitClient.rest.issues.get({
        owner: organization,
        repo: repository,
        issue_number: Number(number),
      });

      return response.data;
    }
  );

  return null;
};

export { IssueView };
