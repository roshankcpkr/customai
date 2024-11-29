import { graphql } from "@hypermode/modus-sdk-as";
import { Project } from "../classes/classes";

const connection: string = "dgraph";


@json
class CreateProjectResponse {
  createProject: Project | null = null;
}

export function createProject(
  name: string,
  endpoint: string,
  isDeployed: boolean,
  description: string,
  token: string,
  owner: String,
): Project | null {
  const statement = `
    mutation createProject($owner: String!, $name: String!, $endpoint: String, $isDeployed: Boolean!, $description: String!, $token: String) {
        addProject(input: {name: $name, endpoint: $endpoint, isDeployed: $isDeployed, description: $description, token: $token, owner: $owner}) {
            numUids
        }
    }
`;

  const vars = new graphql.Variables();
  console.log(name);
  vars.set("name", name);
  vars.set("endpoint", endpoint);
  vars.set("isDeployed", isDeployed);
  vars.set("description", description);
  vars.set("token", token);
  vars.set("owner", owner);

  const response = graphql.execute<CreateProjectResponse>(
    connection,
    statement,
    vars,
  );

  return response.data!.createProject;
}


@json
class ProjectResponse {
  queryProject: Project[] = [];
}

export function getProjects(userId: string): Project[] {
  const statement = `
    query {
        queryProject {
            id
            name
            description
            isDeployed
            endpoint
            owner
            token
        }
    }
`;

  const vars = new graphql.Variables();

  const response = graphql.execute<ProjectResponse>(
    connection,
    statement,
    vars,
  );

  return response.data!.queryProject;
}

export function getProject(id: string): Project | null {
  const statement = `
    query getProject($id: string) {
        queryProject(filter: {id: {eq: $id}}) {
            id
            name
            description
            isDeployed
            endpoint
            owner
            token
        }
    }
`;

  const vars = new graphql.Variables();
  vars.set("id", id);

  const response = graphql.execute<ProjectResponse>(
    connection,
    statement,
    vars,
  );

  return response.data!.queryProject[0];
}

export function updateProject(
  id: string,
  name: string,
  endpoint: string,
  isDeployed: boolean,
  description: string,
  token: string,
  owner: String,
): Project | null {
  const statement = `
    mutation updateProject($id: string!, $owner: String!, $name: String!, $endpoint: String!, $isDeployed: Boolean!, $description: String!, $token: String!) {
        updateProject(input: {filter: {id: {eq: $id}}, set: {name: $name, endpoint: $endpoint, isDeployed: $isDeployed, description: $description, token: $token, owner: $owner}}) {
            numUids
        }
    }
`;

  const vars = new graphql.Variables();
  vars.set("id", id);
  vars.set("name", name);
  vars.set("endpoint", endpoint);
  vars.set("isDeployed", isDeployed);
  vars.set("description", description);
  vars.set("token", token);
  vars.set("owner", owner);

  const response = graphql.execute<CreateProjectResponse>(
    connection,
    statement,
    vars,
  );

  return response.data!.createProject;
}


@json
class DeleteProjectResponse {
  deleteProject: Project | null = null;
}

export function deleteProject(id: string): boolean {
  const statement = `
    mutation deleteProject($id: string!) {
        deleteProject(filter: {id: {eq: $id}}) {
            numUids
        }
    }
`;

  const vars = new graphql.Variables();
  vars.set("id", id);

  const response = graphql.execute<DeleteProjectResponse>(
    connection,
    statement,
    vars,
  );

  return response.data!.deleteProject !== null;
}

export function deployProject(id: string): Project | null {
  const statement = `
    mutation deployProject($id: string!) {
        deployProject(input: {filter: {id: {eq: $id}}}) {
            numUids
        }
    }
`;

  const vars = new graphql.Variables();
  vars.set("id", id);

  const response = graphql.execute<CreateProjectResponse>(
    connection,
    statement,
    vars,
  );

  return response.data!.createProject;
}

export function undeployProject(id: string): Project | null {
  const statement = `
    mutation undeployProject($id: string!) {
        undeployProject(input: {filter: {id: {eq: $id}}}) {
            numUids
        }
    }
`;

  const vars = new graphql.Variables();
  vars.set("id", id);

  const response = graphql.execute<CreateProjectResponse>(
    connection,
    statement,
    vars,
  );

  return response.data!.createProject;
}
