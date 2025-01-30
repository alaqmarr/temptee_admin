"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderColumn = {
  id: string
  email: string
  message: string
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "ID",
    header: "id",
  },
  {
    accessorKey: "Email",
    header: "email",
  },
  {
    accessorKey: "Message",
    header: "message",
  },
]
