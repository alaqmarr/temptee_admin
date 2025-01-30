"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { ImagePlusIcon, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string[]) => void; // Update to handle multiple URLs
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    // Handle multiple uploaded files
    if (result.event === "success") {
      const newUrls = result.info.files.map((file: any) => file.secure_url);
      onChange([...value, ...newUrls]); // Append new URLs to the existing ones
    }
  };

  if (!isMounted) return null;

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                variant={"destructive"}
                onClick={() => onRemove(url)}
                size={"icon"}
                type="button"
                className="rounded-lg"
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
            <Image fill src={url} className="object-cover" alt={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget
        onSuccess={onUpload}
        uploadPreset="asdf1234"
        options={{
          multiple: true, // Enable multiple file uploads
          maxFiles: 8, // Optional: Limit the number of files that can be uploaded
        }}
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type="button"
              disabled={disabled}
              onClick={onClick}
              variant={"secondary"}
            >
              <ImagePlusIcon className="w-4 h-4" />
              Upload Images
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;