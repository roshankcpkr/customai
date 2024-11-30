"use client";

import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CreateProjectResponse {
  data: {
    createProject: {
      id: string;
      name: string;
      description: string;
      isDeployed: boolean;
      endpoint: string;
      owner: string;
      token: string;
    };
  };
}

interface CreateProjectVariables {
  name: string;
  endpoint: string;
  isDeployed: boolean;
  description: string;
  token: string;
  owner: string;
}

async function fetchCreateProject(variables: CreateProjectVariables) {
  const query = `mutation CreateProject($name: String!, $endpoint: String!, $isDeployed: Boolean!, $description: String!, $token: String!, $owner: String!) {
  createProject(name: $name, endpoint: $endpoint, isDeployed: $isDeployed, description: $description, token: $token, owner: $owner) {
    id
    name
    description
    isDeployed
    endpoint
    owner
    token
  }
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

  const result = (await response.json()) as CreateProjectResponse;
  return result.data.createProject;
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
});

export function CreateProjectCard() {
  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: "",
      isDeployed: false,
      description: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const user = useAuth().userId;
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof projectFormSchema>) => {
    function generateRandomString(length: number) {
      let result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }
    const token = await generateRandomString(20);
    console.log("token", token);
    if (user) {
      const result = await fetchCreateProject({
        ...values,
        owner: user,
        token: token,
        endpoint: `https://custom-ai-backend-roshan.hypermode.app/graphql`,
      });
      console.log(result);
      if (result === null) {
        form.reset();
        router.push("/");
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="flex flex-col items-center justify-center bg-inherit border-none shadow-none">
          <CardContent className="bg-white flex items-center justify-center h-40 max-w-3xl  hover:bg-gray-50   cursor-pointer transition-colors border-dashed border-2 border-gray-200">
            <div className="text-center">
              <Plus className="mx-auto mb-2" size={24} />
              <p className="text-lg font-semibold">Create New Project</p>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{"Create New Project"}</DialogTitle>
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
            <Button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
