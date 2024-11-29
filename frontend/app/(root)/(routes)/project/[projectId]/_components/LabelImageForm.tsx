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

const LabelImageForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: "",
      label: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
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
                  <ImageUpload
                    disabled={isLoading}
                    onChange={field.onChange}
                    value={field.value}
                  />
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
