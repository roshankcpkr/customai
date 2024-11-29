import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface CreateProjectCardProps {
  onClick: () => void;
}

export function CreateProjectCard({ onClick }: CreateProjectCardProps) {
  return (
    <Card
      className="flex flex-col items-center justify-center bg-inherit border-none shadow-none"
      onClick={onClick}
    >
      <CardContent className="bg-white flex items-center justify-center h-40 max-w-3xl  hover:bg-gray-50   cursor-pointer transition-colors border-dashed border-2 border-gray-200">
        <div className="text-center">
          <Plus className="mx-auto mb-2" size={24} />
          <p className="text-lg font-semibold">Create New Project</p>
        </div>
      </CardContent>
    </Card>
  );
}
