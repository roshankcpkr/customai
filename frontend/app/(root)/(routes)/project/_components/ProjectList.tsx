"use client";

import { useState } from "react";
import { CreateProjectCard } from "./CreateProjectCard";
import { ProjectCard } from "./ProjectCard";
import { CreateProjectModal, ProjectModal } from "./CreateProjectModal";
import { Button } from "@/components/ui/button";

export function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectIdToEdit, setProjectIdToEdit] = useState<string | undefined>(
    undefined
  );

  const openCreateModal = () => {
    setProjectIdToEdit(undefined);
    setIsModalOpen(true);
  };

  const openEditModal = (id: string) => {
    setProjectIdToEdit(id);
    setIsModalOpen(true);
  };

  return (
    <div>
      {projects.length === 0 ? (
        <div className="text-center">
          <p className="text-xl mb-4">No projects yet</p>
          <CreateProjectCard onClick={() => setIsModalOpen(true)} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects &&
            projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          <CreateProjectCard onClick={() => setIsModalOpen(true)} />
        </div>
      )}
      <div className="container mx-auto p-4">
        <ProjectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          projectId={projectIdToEdit}
        />
      </div>
    </div>
  );
}
