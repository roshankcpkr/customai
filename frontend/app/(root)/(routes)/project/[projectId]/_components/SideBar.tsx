"use client";

import { useState } from "react";
import { Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import LabelForm from "./LabelForm";

interface Label {
  id: string;
  name: string;
}

interface SidebarProps {
  projectId: string;
  initialLabels: Label[];
}

export function Sidebar({ projectId, initialLabels }: SidebarProps) {
  const [labels, setLabels] = useState(initialLabels);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const router = useRouter();

  const addLabel = (newLabel: Label) => {
    setLabels(prevLabels => [...prevLabels, newLabel]);
    router.refresh();
  };

  const deleteLabel = async (labelId: string) => {
    try {
      const response = await fetch(
        `/api/projects/${projectId}/labels/${labelId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setLabels(prevLabels =>
          prevLabels.filter(label => label.id !== labelId)
        );
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to delete label:", error);
    }
  };

  return (
    <ShadcnSidebar>
      <SidebarHeader className="p-2">
        <h2 className="text-lg font-semibold p-2">Labels</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Label</DialogTitle>
            </DialogHeader>
            <LabelForm projectId={projectId} onSuccess={addLabel} />
          </DialogContent>
        </Dialog>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {labels.map(label => (
            <ContextMenu key={label.id}>
              <ContextMenuTrigger>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setSelectedLabel(label.id)}
                    isActive={selectedLabel === label.id}
                  >
                    {label.name}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem onClick={() => deleteLabel(label.id)}>
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </ShadcnSidebar>
  );
}
