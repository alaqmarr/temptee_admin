import { ApiAlert } from "@/components/ui/api-alert";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
  params: {
    storeId: string;
  };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({
  params
}) => {
  const origin = process.env.NEXT_PUBLIC_API_ORIGIN;
  const storeId = params.storeId;
  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
    },
    include: {
      categories: true,
      products: true,
      billboards: true,
      sizes: true,
      colors: true,
    }
  });

  if (!store) {
    return (
      <div className="p-10">
        <h1 className="text-4xl font-bold">Store not found</h1>
      </div>
    )
  }

  return (
    <div className=" p-5 flex flex-col space-y-4 justify-center ">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col items-center">
          <CardHeader>
            <h2 className="text-xl font-bold">Store Name</h2>
          </CardHeader>

          <CardContent>
            <h1 className="text-2xl font-bold">{store.name}</h1>
          </CardContent>
        </Card>
        <Card className="flex flex-col items-center">
          <CardHeader>
            <h2 className="text-xl font-bold">Total Products</h2>
          </CardHeader>

          <CardContent>
            <h1 className="text-4xl font-bold">{store.products.length}</h1>
          </CardContent>
        </Card>

        <Card className="flex flex-col items-center">
          <CardHeader>
            <h2 className="text-xl font-bold">Total Categories</h2>
          </CardHeader>

          <CardContent>
            <h1 className="text-4xl font-bold">{store.categories.length}</h1>
          </CardContent>
        </Card>

        <Card className="flex flex-col items-center">
          <CardHeader>
            <h2 className="text-xl font-bold">Total Billboards</h2>
          </CardHeader>

          <CardContent>
            <h1 className="text-4xl font-bold">{store.billboards.length}</h1>
          </CardContent>
        </Card>


        <Card className="flex flex-col items-center">
          <CardHeader>
            <h2 className="text-xl font-bold">Total Sizes</h2>
          </CardHeader>

          <CardContent>
            <h1 className="text-4xl font-bold">{store.sizes.length}</h1>
          </CardContent>
        </Card>

        <Card className="flex flex-col items-center">
          <CardHeader>
            <h2 className="text-xl font-bold">Total Colors</h2>
          </CardHeader>

          <CardContent>
            <h1 className="text-4xl font-bold">{store.colors.length}</h1>
          </CardContent>
        </Card>


      </div>

      <div className="flex flex-col items-center space-y-4">

        <ApiAlert
          title="NEXT_PUBLIC_API_URL"
          description={`${origin}/api/${params.storeId}`}
          variant="public"
        />
      </div>
    </div>
  )

};

export default DashboardPage;
