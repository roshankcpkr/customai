"use client";

import { useEffect, useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import { ImageUp } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (imageUrl: string) => void;
}

export const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (value) {
      console.log(`Uploading ${value}`);
    }
  }, [value]);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }

  return (
    <div
      className="space-y-4 w-full flex flex-col
        items-center justify-center"
    >
      <CldUploadButton
        uploadPreset="weafawfwaTFGVG"
        options={{ maxFiles: 1 }}
        onSuccess={(result: any) => onChange(result.info.secure_url)}
      >
        <div className="p-2 border-4 border-dashed border-primary/10 rounded-lg hover:opacity-75 transition flex flex-col space-y-2 items-center justify-center">
          {value ? (
            <div className="relative h-40 w-40">
              <Image
                fill
                alt="Upload"
                src={value || "/placeholder.png"}
                className="rounded-lg object-cover"
              />
            </div>
          ) : (
            <ImageUp size={24} />
          )}
        </div>
      </CldUploadButton>
    </div>
  );
};
