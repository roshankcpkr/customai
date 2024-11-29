"use client";

import { useMutation, gql, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const CREATE_PROJECT = gql`
  mutation CreateProject(
    $name: String!
    $isDeployed: Boolean!
    $description: String!
    $owner: String!
  ) {
    createProject(
      name: $name
      isDeployed: $isDeployed
      description: $description
      owner: $owner
    ) {
      id
      name
      description
      isDeployed
      owner
    }
  }
`;

const GET_PROJECT = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      id
      name
      description
      isDeployed
      owner
    }
  }
`;

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId?: string;
}

const projectFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters long",
    })
    .max(40, {
      message: "Name must be at most 40 characters long",
    }),
  isDeployed: z.boolean(),
  description: z
    .string()
    .min(2, {
      message: "Description must be at least 2 characters long",
    })
    .max(200, {
      message: "Description must be at most 1000 characters long",
    }),
  owner: z.string().min(2, {
    message: "Owner must be at least 2 characters long",
  }),
});

export function ProjectModal({
  isOpen,
  onClose,
  projectId,
}: ProjectModalProps) {
  const [createProject] = useMutation(CREATE_PROJECT);
  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: "",
      isDeployed: false,
      description: "",
      owner: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const user = useAuth().userId;

  const onSubmit = async (values: z.infer<typeof projectFormSchema>) => {
    console.log("values", values);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {projectId ? "Edit Project" : "Create New Project"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid">
                <FormField
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormDescription className="text-muted-foreground">
                        What is your project called?
                      </FormDescription>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Dog classification"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid">
                <FormField
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descriptions</FormLabel>
                      <FormDescription>
                        Give a brief description of your project
                      </FormDescription>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Dog breed classification"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid">
                <FormField
                  name="isDeployed"
                  render={({ field }) => (
                    <FormItem className="flex items-end">
                      <FormLabel className="mr-4 font-semibold">
                        Is deployed
                      </FormLabel>
                      <FormControl>
                        <Checkbox {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
