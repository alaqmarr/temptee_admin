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
    console.log(result);
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
                type="button"
                variant={"destructive"}
                size={"icon"}
                onClick={() => onRemove(url)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" src={url} alt="Image" />
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
              variant={"secondary"}
              onClick={onClick}
            >
              <ImagePlusIcon className="mr-2 w-4 h-4" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
