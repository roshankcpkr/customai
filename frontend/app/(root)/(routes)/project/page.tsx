"use client";

import { ProjectList } from "./_components/ProjectList";
import { useAuth } from "@clerk/nextjs";

export const dynamic = "force-dynamic";

export default function ProjectPage() {
  const { userId } = useAuth(); // Get user from Clerk context

  if (!userId) {
    return <p className="pt-40 pl-40 font-semibold">Loading...</p>;
  }

  return (
    <div className="bg-muted-foreground/10 h-screen p-10 pt-20">
      <h2 className="text-2xl font-bold mb-6">Your Projects</h2>
      <ProjectList />
    </div>
  );
}
