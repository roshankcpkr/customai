"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LabelImageFormProps {
  projectId: string;
  onSuccess?: (newLabel: { id: string; name: string }) => void;
}

const LabelForm = ({ projectId, onSuccess }: LabelImageFormProps) => {
  const [labelName, setLabelName] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/projects/${projectId}/labels`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: labelName }),
      });
      if (response.ok) {
        const newLabel = await response.json();
        onSuccess?.(newLabel);
        setLabelName("");
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to create label:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="labelName">Label Name</Label>
        <Input
          id="labelName"
          value={labelName}
          onChange={e => setLabelName(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Create Label</Button>
    </form>
  );
};

export default LabelForm;
