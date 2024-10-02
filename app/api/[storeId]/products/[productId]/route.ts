import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { productId: string; storeId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse("Product ID is required.", { status: 400 });
    }
    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,

      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCT_" + params.productId + "_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string; storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const {
      name,
      images,
      price,
      categoryId,
      sizeId,
      colorId,
      isFeatured,
      isArchived,
      description,
      quantity
    } = body;

    if (!name) {
      return new NextResponse("Name is required.", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images is required.", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category ID is required.", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("Size ID is required.", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("Color ID is required.", { status: 400 });
    }

    if (isFeatured === undefined) {
      return new NextResponse("Featured is required.", { status: 400 });
    }

    if (isArchived === undefined) {
      return new NextResponse("Archived is required.", { status: 400 });
    }

    if (!params.productId) {
      return new NextResponse("Store ID is required.", { status: 400 });
    }
    await prismadb.product.update({
      where: {
        id: params.productId,
        storeId: params.storeId,
      },
      data: {
        name,
        images : {
          deleteMany: {
            
          }
        },
        price,
        categoryId,
        sizeId,
        colorId,
        isFeatured,
        isArchived,
        storeId: params.storeId,
        description,
        quantity
      },
    });

    const product = await prismadb.product.update({
      where: {
        id: params.productId,
        storeId: params.storeId,
      },
      data: {
        images: {
          createMany: {
            data :[
              ...images.map((image: {url:string}) => image),
            ]
          },
        }
      }
    })

    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCT_" + params.productId + "_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string; storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!params.productId) {
      return new NextResponse("Product ID is required.", { status: 400 });
    }
    const storeByUserid = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserid) {
      return new NextResponse("Store not found", { status: 404 });
    }
    const product = await prismadb.product.deleteMany({
      where: {
        id: params.productId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCT_" + params.productId + "_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
