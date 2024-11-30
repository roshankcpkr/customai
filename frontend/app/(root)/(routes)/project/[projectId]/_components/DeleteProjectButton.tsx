"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@clerk/nextjs";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

interface DeleteProjectResponse {
  data: {
    deleteProject: boolean;
  };
}

interface DeleteProjectVariables {
  id: string;
  owner: string;
}

async function fetchDeleteProject(variables: DeleteProjectVariables) {
  const query = `mutation DeleteProject($id: String!, $owner: String!) {
    deleteProject(id: $id, owner: $owner)
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

  const result = (await response.json()) as DeleteProjectResponse;
  return result.data.deleteProject;
}

export function DeleteProjectButton({ projectId }: { projectId: string }) {
  const { userId } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const deleteProject = () => {
    try {
      if (userId) {
        const fetchData = async () => {
          const result = await fetchDeleteProject({
            id: projectId,
            owner: userId,
          });
          console.log(result);
        };
        fetchData();
      }
      toast({
        title: "Project deleted",
        description: "Your project has been deleted successfully",
      });
      router.refresh();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size={"sm"}>
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            project and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteProject}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
