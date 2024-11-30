import { graphql } from "@hypermode/modus-sdk-as";
import { Project } from "../classes/classes";
import { JSON } from "json-as";

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
            project {
             id
              name
            }
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
  const log = JSON.stringify(response.data!.createProject);
  console.log(log);

  return response.data!.createProject;
}


@json
class ProjectData {
  id: string;
  name: string;
  description: string;
  isDeployed: boolean;
  endpoint: string;
  owner: string;
  token: string;
}


@json
class ProjectResponse {
  queryProject: ProjectData[];
}


@json
class GetSingleProjectResponse {
  getProject: ProjectData | null;
}

export function getProjects(userId: string): ProjectData[] {
  const statement = `
    query queryProject($userId: String) {
        queryProject(filter: {owner: {eq: $userId}}) {
           description
            endpoint
            id
            isDeployed
            name
            owner
            token
        }
    }
`;

  const vars = new graphql.Variables();
  vars.set("userId", userId);

  const response = graphql.execute<ProjectResponse>(
    connection,
    statement,
    vars,
  );

  return response.data!.queryProject;
}

export function getProject(id: string): ProjectData | null {
  const statement = `
    query getProject($id: ID!) {
        getProject(id: $id) {
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

  const response = graphql.execute<GetSingleProjectResponse>(
    connection,
    statement,
    vars,
  );

  return response.data!.getProject;
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
  deleteProject: Project | null;
}

export function deleteProject(id: string, owner: string): boolean {
  const deleteImageStatement = `
    mutation deleteImage($projectId: string) {
        deleteImage(filter: {projectId: {eq: $projectId}}) {
            numUids
        }
    }
  `;

  const deleteImageVars = new graphql.Variables();
  deleteImageVars.set("projectId", id);

  const deleteImageResponse = graphql.execute<DeleteProjectResponse>(
    connection,
    deleteImageStatement,
    deleteImageVars,
  );

  const statement = `
    mutation deleteProject($id: [ID!], $owner: String) {
        deleteProject(filter: {id: $id, owner: {eq: $owner}}) {
            numUids
        }
    }
`;

  const vars = new graphql.Variables();
  vars.set("id", id);
  vars.set("owner", owner);

  const response = graphql.execute<DeleteProjectResponse>(
    connection,
    statement,
    vars,
  );
  const value = response.data!.deleteProject;
  return value ? true : false;
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
