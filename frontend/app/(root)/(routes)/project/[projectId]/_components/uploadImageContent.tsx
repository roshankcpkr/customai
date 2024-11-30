"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Steps, Step } from "./steps";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function WelcomePage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Welcome to Our Image Classification App
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Follow these steps to get started with our image classification
          project:
        </p>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <Steps>
            <Step title="Upload Images with Labels">
              <p>
                Begin by uploading your images and assigning labels to them.
                This forms the foundation of your classification project.
              </p>
            </Step>
            <CollapsibleContent>
              <Step title="Provide Multiple Labels">
                <p>
                  For more accurate classification, provide multiple labels for
                  each image when applicable. This helps in creating a more
                  robust inference api.
                </p>
              </Step>
              <Step title="Use More Than 20 Images Per Label">
                <p>
                  To ensure the best results, use at least 20 images per label.
                  This helps to identify image properly.
                </p>
              </Step>
            </CollapsibleContent>
          </Steps>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full mt-4">
              {isOpen ? (
                <>
                  View Less <ChevronUp className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  View More <ChevronDown className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CollapsibleTrigger>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
