import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "./_components/SideBar";
import { LabelImages } from "./_components/LabelImages";
import LabelImageForm from "./_components/LabelImageForm";

interface ProjectIdPageProps {
  params: { projectId: string };
}

async function getProjectLabels(projectId: string) {
  // This is a placeholder function. Replace with actual data fetching logic.
  return [
    { id: "1", name: "Label 1" },
    { id: "2", name: "Label 2" },
    { id: "3", name: "Label 3" },
  ];
}

const ProjectIdPage = async ({ params }: ProjectIdPageProps) => {
  const labels = await getProjectLabels(params.projectId);
  return (
    <div>
      <h1>Project ID: {params.projectId}</h1>
      <SidebarProvider>
        <div className="flex h-screen">
          <Sidebar projectId={params.projectId} initialLabels={labels} />
          <main className="flex-1 p-6 overflow-auto">
            <h1 className="text-2xl font-bold mb-6">
              Project ID: {params.projectId}
            </h1>
            <LabelImageForm />
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default ProjectIdPage;
