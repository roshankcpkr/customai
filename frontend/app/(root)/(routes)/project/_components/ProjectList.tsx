"use client";

import { useEffect, useState } from "react";
import { CreateProjectCard } from "./CreateProjectCard";
import { ProjectCard } from "./ProjectCard";
import { useAuth } from "@clerk/nextjs";

interface ProjectsResponse {
  data: {
    projects: Array<{
      id: string;
      name: string;
      description: string;
      isDeployed: boolean;
      endpoint: string;
      owner: string;
      token: string;
    }>;
  };
}

interface ProjectsVariables {
  userId: string;
}

async function fetchProjects(variables: ProjectsVariables) {
  const query = `query Projects($userId: String!) {
  projects(userId: $userId) {
    id
    name
    description
    isDeployed
    endpoint
    owner
    token
  }
}`;

  const response = await fetch(`${process.env.NEXT_PUBCLI_BACKEND_API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result = (await response.json()) as ProjectsResponse;
  return result.data.projects;
}

export function ProjectList() {
  const [projects, setProjects] = useState<
    Array<{
      id: string;
      name: string;
      description: string;
      isDeployed: boolean;
      endpoint: string;
      owner: string;
      token: string;
    }>
  >([]);
  const { userId } = useAuth();
  useEffect(() => {
    async function fetch() {
      if (userId) {
        const projects = await fetchProjects({ userId: userId });

        setProjects(projects);
      }
    }
    fetch();
  }, [userId]);

  return (
    <div className="bg-white h-full p-8 rounded-lg">
      {projects.length === 0 ? (
        <div className="text-center">
          <p className="text-xl mb-4">No projects yet</p>
          <CreateProjectCard />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CreateProjectCard />

          {projects &&
            projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
        </div>
      )}
      <div className="container mx-auto p-4"></div>
    </div>
  );
}
