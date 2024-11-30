"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useClipboard } from "@/hooks/use-clipboard";
import { CopyIcon, CheckIcon } from "lucide-react";

export default function APICredentials({
  token,
  endpoint,
}: {
  token: string;
  endpoint: string;
}) {
  const endpointClipboard = useClipboard();
  const tokenClipboard = useClipboard();

  const codeString = `interface RunInferenceResponse {
    data: {
      runInference: Array<{
          label: string;
        }>;
    }
  }
  
  interface RunInferenceVariables {
    imageUrl: string;
    projectId: string;
    token: string;
  }
  
  async function fetchRunInference(variables: RunInferenceVariables) {
    const query = \`query RunInference($imageUrl: String!, $projectId: String!, $token: String!) {
    runInference(imageUrl: $imageUrl, projectId: $projectId, token: $token) {
      label
    }
  }\`;
  
    const response = await fetch('http://localhost:8686/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      })
    });
  
    const result = await response.json() as RunInferenceResponse;
    return result.data.runInference;
  }
  
  
  const result = await fetchRunInference({
    imageUrl: "example",
    projectId: "example",
    token: "example"
  });`;

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>API Credentials</CardTitle>
        <CardDescription>
          Your API endpoint and token for making requests
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="endpoint" className="text-sm font-medium">
            Endpoint
          </label>
          <div className="flex">
            <Input
              id="endpoint"
              value={endpoint}
              readOnly
              className="flex-grow"
            />
            <Button
              onClick={() => endpointClipboard.copy(endpoint)}
              className="ml-2 w-24"
            >
              {endpointClipboard.copied ? (
                <CheckIcon className="h-4 w-4" />
              ) : (
                <CopyIcon className="h-4 w-4" />
              )}
              {endpointClipboard.copied ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="token" className="text-sm font-medium">
            API Token
          </label>
          <div className="flex">
            <Input
              id="token"
              value={token}
              readOnly
              className="flex-grow"
              type="password"
            />
            <Button
              onClick={() => tokenClipboard.copy(token)}
              className="ml-2 w-24"
            >
              {tokenClipboard.copied ? (
                <CheckIcon className="h-4 w-4" />
              ) : (
                <CopyIcon className="h-4 w-4" />
              )}
              {tokenClipboard.copied ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Use Case Example</h3>
          <pre className="p-4 overflow-x-auto bg-gray-100 rounded-md">
            <code className="text-sm font-mono text-gray-800">
              {codeString}
            </code>
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}
