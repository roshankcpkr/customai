"use client";

import { useEffect, useState } from "react";
import { CldUploadButton } from "next-cloudinary";

interface ImageUploadProps {
  value: string[];
  onChange: (imageUrl: string[]) => void;
  disabled?: boolean;
}

export const ImageUpload = ({
  value,
  onChange,
  disabled,
}: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (value.length > 0) {
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
        uploadPreset="customaiawdwadwad"
        options={{ maxFiles: 20 }}
        onSuccess={(result: any) => {
          const newUrls = Array.isArray(result)
            ? result.map((r: any) => r.info.secure_url)
            : [result.info.secure_url];
          console.log("newurls", newUrls);
          onChange([...value, ...newUrls]);
        }}
      >
        <div className="p-4 border-4 border-dashed border-primary/10 rounded-lg hover:opacity-75 transition flex flex-col space-y-2 items-center justify-center">
          <div className="relative h-40 w-40"></div>
        </div>
      </CldUploadButton>
    </div>
  );
};
