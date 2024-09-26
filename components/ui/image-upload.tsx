"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { ImagePlusIcon, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
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
    onChange(result.info.secure_url);
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
      <CldUploadWidget onSuccess={onUpload} uploadPreset="asdf1234">
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
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
