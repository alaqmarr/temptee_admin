"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProductColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { AlertModal } from "@/components/modals/alert-modal";

interface CellActionProps {
  data: ProductColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("ID copied to clipboard");
  };
  const onDelete = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/products/${id}`);
      router.refresh();
      toast.success("Product deleted");
    } catch (error) {
      toast.error("Make sure you removed all categories first");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          onDelete(data.id);
        }}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"icon"} variant={"secondary"} className="h-8 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              router.push(`/${params.storeId}/products/${data.id}`);
            }}
          >
            <Edit className="w-4 h-4 mr-2" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              onCopy(data.id);
            }}
          >
            <Copy className="w-4 h-4 mr-2" /> Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="w-4 h-4 mr-2" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
