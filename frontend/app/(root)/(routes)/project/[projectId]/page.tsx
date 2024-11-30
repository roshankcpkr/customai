import React from "react";

import TabComponent from "./_components/TabComponent";
import { DeleteProjectButton } from "./_components/DeleteProjectButton";

interface ProjectIdPageProps {
  params: { projectId: string };
}

interface ProjectResponse {
  data: {
    project: {
      id: string;
      name: string;
      description: string;
      isDeployed: boolean;
      endpoint: string;
      owner: string;
      token: string;
    };
  };
}

interface ProjectVariables {
  id: string;
}

async function fetchProject(variables: ProjectVariables) {
  const query = `query Project($id: String!) {
  project(id: $id) {
    id
    name
    description
    isDeployed
    endpoint
    owner
    token
  }
}`;

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  const result = (await response.json()) as ProjectResponse;
  return result.data.project;
}

const ProjectIdPage = async ({ params }: ProjectIdPageProps) => {
  const { projectId } = params;
  const projectData = await fetchProject({ id: projectId });

  if (!projectData) {
    return <div>Project not found</div>;
  }
  return (
    <div className="grid gap-4 pt-20 md:p-20 bg-gray-50">
      <div className="p-4 rounded-lg">
        <div className="flex flex-col justify-between items-center w-full">
          <div className="max-w-3xl px-8 mb-2 flex justify-between items-center flex-wrap">
            <DeleteProjectButton projectId={projectId} />
            <h2 className="text-lg font-semibold mb-2 ml-8">
              {projectData.name}
            </h2>
          </div>
          <TabComponent
            token={projectData.token}
            endpoint={projectData.endpoint}
            projectId={projectId}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectIdPage;
