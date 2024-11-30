"use client";

import { useState } from "react";
import { TagIcon as Label, Upload, Zap, TestTube } from "lucide-react";
import LabelImageForm from "./LabelImageForm";

const contentData = {
  Labels: "Manage and organize your Image labels here.",
  API: "Access your project API credentials.",
  "Upload Image": "Upload and manage project images.",
  "Test Your Project": "Run tests and view results for your project.",
};

export function AppContent({ children }: { children: React.ReactNode }) {
  const [activeItem, setActiveItem] = useState("Labels");

  return (
    <div className="flex-1 p-6 md:p-8 overflow-auto">
      <h1 className="text-2xl font-bold mb-4">{activeItem}</h1>
      <p className="mb-6">
        {contentData[activeItem as keyof typeof contentData]}
      </p>
      {activeItem === "Upload Image" ? <LabelImageForm /> : children}
    </div>
  );
}
