"use client";

import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ImageUpload } from "./ImageUpload";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@clerk/nextjs";

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image url must be a valid URL",
  }),
  label: z
    .string()
    .min(1, {
      message: "Label must be at least 1 character long",
    })
    .max(100, {
      message: "Label must be at most 100 characters long",
    }),
});

interface CreateImageResponse {
  data: {
    createImage: {
      id: string;
      imageUrl: string;
      label: string;
      projectId: string;
      token: string;
      embedding: Array<number>;
      owner: string;
    };
  };
}

interface CreateImageVariables {
  imageUrl: string;
  label: string;
  projectId: string;
  token: string;
  owner: string;
}

async function fetchCreateImage(variables: CreateImageVariables) {
  const query = `mutation CreateImage($imageUrl: String!, $label: String!, $projectId: String!, $token: String!, $owner: String!) {
  createImage(imageUrl: $imageUrl, label: $label, projectId: $projectId, token: $token, owner: $owner) {
    id
    imageUrl
    label
    projectId
    token
    embedding
    owner
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

  const result = (await response.json()) as CreateImageResponse;
  return result.data.createImage;
}

const LabelImageForm = ({
  projectId,
  token,
}: {
  projectId: string;
  token: string;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: "",
      label: "",
    },
  });
  const isLoading = form.formState.isSubmitting;
  const router = useRouter();
  const toast = useToast();
  const { userId } = useAuth();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    if (!userId) {
      return;
    }
    try {
      const fetchData = async () => {
        const result = await fetchCreateImage({
          imageUrl: values.imageUrl,
          label: values.label.toLowerCase(),
          projectId: projectId,
          token: token,
          owner: userId,
        });
        console.log("result", result);
      };
      fetchData();
      form.reset();
      toast.toast({
        title: "Image uploaded",
        description: "Image has been uploaded successfully",
      });
      router.push(`/project/${projectId}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-20 space-y-4 md:max-w-2xl flex justify-center flex-col mx-auto"
        >
          <FormField
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ImageUpload onChange={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="label"
            render={({ field }) => (
              <FormItem className="col-span-2 md:col-span-1">
                <FormLabel>Name (NickName)</FormLabel>
                <FormDescription className="text-muted-foreground">
                  What are these images of? Give label
                </FormDescription>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Golden Retriever"
                    disabled={isLoading}
                    className="bg-white dark:bg-black"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Upload Images"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LabelImageForm;
