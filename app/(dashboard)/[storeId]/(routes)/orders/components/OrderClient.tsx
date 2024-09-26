"use client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { PlusCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { OrderColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-lists";


interface OrderClientProps {
  data: OrderColumn[]
}
const OrderClient: React.FC<OrderClientProps> = ({
  data
}) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Orders (${data.length})`}
          description="Manage all the orders for your store"
        />
        <Button
          onClick={() => {
            router.push(`/${params.storeId}/orders/new`);
          }}
        >
          <PlusCircle className="mr-2 w-4 h-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="label"/>
      <Heading title="API Config" description="API Routes to manage orders from front-end" />
      <Separator/>
      <ApiList entityName="orders" entityIdName="orderId"/>
    </>
  );
};

export default OrderClient;
