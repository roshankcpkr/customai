import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description?: string;
    isDeployed: boolean;
    endpoint?: string;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/project/${project.id}`}>
      <Card className="cursor-pointer hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>{project.name}</CardTitle>
        </CardHeader>
        <CardContent>
          {project.description && <p className="mb-2">{project.description}</p>}
          {project.endpoint && (
            <p className="mt-2 text-sm text-gray-500">
              Endpoint: {project.endpoint}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
