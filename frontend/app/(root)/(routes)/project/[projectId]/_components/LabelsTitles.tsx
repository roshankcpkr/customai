import { Card } from "@/components/ui/card";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { DeleteLabelButton } from "./DeleteLabelButton";

interface LabelsResponse {
  data: {
    labels: Array<{
      id: string;
      label: string;
      imageUrl: string;
    }>;
  };
}

interface LabelsVariables {
  projectId: string;
  ownerId: string;
}

async function fetchLabels(variables: LabelsVariables) {
  const query = `query Labels($projectId: String!, $ownerId: String!) {
    labels(projectId: $projectId, ownerId: $ownerId) {
      id
      label
      imageUrl
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

  const result = (await response.json()) as LabelsResponse;
  return result.data.labels;
}

const LabelsTitles = ({ projectId }: { projectId: string }) => {
  const [labels, setLabels] = useState<
    Array<{
      id: string;
      label: string;
      imageUrl: string;
    }>
  >([]);
  const { userId } = useAuth();

  useEffect(() => {
    if (userId) {
      fetchLabels({ projectId, ownerId: userId }).then(labels => {
        setLabels(labels);
      });
    }
  }, [projectId, userId]);

  return (
    <div className="flex gap-3 flex-wrap mt-2 h-full">
      {userId &&
        labels.map(label => (
          <Card key={label.id}>
            <p className="font-semibold p-2">{label.label}</p>
            <Image
              src={label.imageUrl}
              alt={label.label}
              width={150}
              height={150}
            />

            <DeleteLabelButton
              projectId={projectId}
              imageId={label.id}
              ownerId={userId}
            />
          </Card>
        ))}
    </div>
  );
};

export default LabelsTitles;
