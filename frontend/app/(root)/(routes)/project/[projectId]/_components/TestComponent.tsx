import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ImageUpload } from "./ImageUpload";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image url must be a valid URL",
  }),
});

interface RunInferenceResponse {
  data: {
    runInference: Array<{
      label: string;
    }>;
  };
}

interface RunInferenceVariables {
  imageUrl: string;
  projectId: string;
  token: string;
}

async function fetchRunInference(variables: RunInferenceVariables) {
  const query = `query RunInference($imageUrl: String!, $projectId: String!, $token: String!) {
    runInference(imageUrl: $imageUrl, projectId: $projectId, token: $token) {
      label
    }
  }`;

  const response = await fetch("http://localhost:8686/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result = (await response.json()) as RunInferenceResponse;
  return result.data.runInference;
}

const TestComponent = ({
  token,
  projectId,
}: {
  token: string;
  projectId: string;
}) => {
  const [label, setLabel] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("values", values);
    const fetchData = async () => {
      const result = await fetchRunInference({
        imageUrl: values.imageUrl,
        projectId: projectId,
        token: token,
      });
      setLabel(result[0]?.label);
      console.log("result", result);
    };
    fetchData();
  };

  return (
    <div>
      {label ? (
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Label</h2>
          <p className="text-lg">{label}</p>
        </div>
      ) : (
        <div className="mt-8">
          <h2 className="text-xl font-semibold">No label</h2>
          <p className="text-lg">{label}</p>
        </div>
      )}
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
          <Button
            type="submit"
            disabled={isLoading}
            size={"lg"}
            className="mt-8"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TestComponent;
