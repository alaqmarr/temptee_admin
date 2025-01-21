import { ApiAlert } from "@/components/ui/api-alert";
import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
  params: {
    storeId: string;
  };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({
  params
}) => {
  const storeId = params.storeId;
  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
    },
  });

  const products = await prismadb.product.findMany({
    where: {
      storeId: storeId,
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId: storeId,
    },
  });

  return(
  <div>
    Active Store {store?.name}
    <br/>
    <ApiAlert
          title="NEXT_PUBLIC_API_URL"
          description={`${origin}/api/${params.storeId}`}
          variant="public"
          />
    </div>
  )
    
};

export default DashboardPage;
