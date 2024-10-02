"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  id: string,
  name: string,
  price: string,
  isFeatured: boolean,
  isArchived: boolean,
  category: string,
  size: string,
  color: string,
  createdAt: string,
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Price",
    accessorKey: "price",
  },
  {
    header: "Category",
    accessorKey: "category",
  },
  {
    header: "Quantity",
    accessorKey: "quantity",
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  {
    header: "Size",
    accessorKey: "size",
  },
  {
    header: "Color",
    accessorKey: "color",
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />,
  },
]
