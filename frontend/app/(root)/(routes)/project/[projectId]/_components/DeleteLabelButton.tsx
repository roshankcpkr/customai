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

interface DeleteLabelResponse {
  data: {
    deleteLabel: boolean;
  };
}

interface DeleteLabelVariables {
  imageId: string;
  projectId: string;
  ownerId: string;
}

async function fetchDeleteLabel(
  variables: DeleteLabelVariables
): Promise<boolean> {
  const query = `mutation DeleteLabel($imageId: String!, $projectId: String!, $ownerId: String!) {
    deleteLabel(imageId: $imageId, projectId: $projectId, ownerId: $ownerId)
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

  const result = (await response.json()) as DeleteLabelResponse;
  return result.data.deleteLabel;
}

export function DeleteLabelButton({
  imageId,
  projectId,
}: {
  imageId: string;
  projectId: string;
}) {
  const { userId } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const deleteProject = () => {
    try {
      if (userId) {
        const fetchData = async () => {
          const result = await fetchDeleteLabel({
            imageId: imageId,
            projectId: projectId,
            ownerId: userId,
          });
          console.log(result);
        };
        fetchData();
      }
      toast({
        title: "Label deleted",
        description: "Your Label has been deleted successfully",
      });
      router.refresh();
      router.push(`/project`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash className="w-6 h-6 m-2 hover:cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            label and remove your data from our servers.
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
