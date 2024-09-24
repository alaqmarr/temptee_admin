"use client";

import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import { ApiAlert } from "./api-alert";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}
export const ApiList: React.FC<ApiListProps> = ({
  entityName,
  entityIdName,
}) => {
  const params = useParams();
  const origin = useOrigin();

  const base = `${origin}/api/${params.storeId}`;

  return (
    <>
      <ApiAlert
        title="GET"
        variant="public"
        description={`${base}/${entityName}`}
      />
      <ApiAlert
        title="GET"
        variant="public"
        description={`${base}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="POST"
        variant="admin"
        description={`${base}/${entityName}`}
      />
      <ApiAlert
        title="PATCH"
        variant="admin"
        description={`${base}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="DELETE"
        variant="admin"
        description={`${base}/${entityName}/{${entityIdName}}`}
      />
    </>
  );
};
