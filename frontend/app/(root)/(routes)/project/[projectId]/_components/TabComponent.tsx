"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { WelcomePage } from "./uploadImageContent";
import LabelImageForm from "./LabelImageForm";
import APICredentials from "./apiCredential";
import TestComponent from "./TestComponent";
import LabelsTitles from "./LabelsTitles";

export default function TabComponent({
  token,
  endpoint,
  projectId,
}: {
  token: string;
  endpoint: string;
  projectId: string;
}) {
  const [activeTab, setActiveTab] = useState("welcome");

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-6">
        <Tabs
          defaultValue="welcome"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="welcome">Upload Labelled Images</TabsTrigger>
            <TabsTrigger value="labels">Labels</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
            <TabsTrigger value="test">Test</TabsTrigger>
          </TabsList>
          <div className="mt-6">
            <TabsContent value="welcome">
              <WelcomePage />
              <LabelImageForm token={token} projectId={projectId} />
            </TabsContent>
            <TabsContent value="labels">
              <h2 className="text-2xl font-bold mb-4">Labels Content</h2>
              <p>Views Images and labels you created.</p>
              <LabelsTitles projectId={projectId} />
            </TabsContent>
            <TabsContent value="api">
              <APICredentials token={token} endpoint={endpoint} />
            </TabsContent>
            <TabsContent value="test">
              <h2 className="text-2xl font-bold mb-4">Test Your project</h2>
              <p>
                Upload one image to test if the project is working as expected
              </p>
              <TestComponent projectId={projectId} token={token} />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
