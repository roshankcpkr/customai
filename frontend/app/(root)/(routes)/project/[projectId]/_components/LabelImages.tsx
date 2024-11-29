"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LabelImage {
  id: string;
  url: string;
}

interface LabelImagesProps {
  projectId: string;
  labelId: string;
}

export function LabelImages({ projectId, labelId }: LabelImagesProps) {
  const [images, setImages] = useState<LabelImage[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch(
        `/api/projects/${projectId}/labels/${labelId}/images`
      );
      if (response.ok) {
        const data = await response.json();
        setImages(data);
      }
    };
    fetchImages();
  }, [projectId, labelId]);

  const deleteImage = async (imageId: string) => {
    try {
      const response = await fetch(
        `/api/projects/${projectId}/labels/${labelId}/images/${imageId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setImages(prevImages =>
          prevImages.filter(image => image.id !== imageId)
        );
      }
    } catch (error) {
      console.error("Failed to delete image:", error);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map(image => (
        <div key={image.id} className="relative group">
          <Image
            src={image.url}
            alt="Labeled image"
            width={200}
            height={200}
            className="object-cover rounded-md"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => deleteImage(image.id)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
