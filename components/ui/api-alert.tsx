"use client"
import { Copy, Server } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Badge, BadgeProps } from "./badge";
import { Button } from "./button";
import toast from "react-hot-toast";
import { deoptional } from "zod";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

export const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant = "public",
}) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success(`${title} copied to clipboard!`);
  };
  return (
    <Alert className="w-full flex flex-col items-center justify-center" >
      <AlertTitle className="w-full flex items-center justify-between font-bold">
      <Server className="h-4 w-4" />
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="w-full mt-4 flex items-center justify-between">
        <code className="rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold break-all">
          {description}
        </code>
        <Button
          variant="outline"
          size="icon"
          className="ml-2 p-2"
          onClick={() => {
            onCopy();
          }}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
