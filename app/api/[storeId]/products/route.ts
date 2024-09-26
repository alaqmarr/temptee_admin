import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
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
      categoryId,
      sizeId,
      colorId,
      isFeatured,
      isArchived,
      price,
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

    if (!params.storeId) {
      return new NextResponse("Store ID is required.", {
        status: 400,
      });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Store not found", { status: 404 });
    }

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        categoryId,
        sizeId,
        colorId,
        isFeatured,
        isArchived,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [
              ...images.map((image: { url: string }) => image),
            ]
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("categoryId") || undefined;
  const sizeId = searchParams.get("sizeId") || undefined;
  const colorId = searchParams.get("colorId") || undefined;
  const isFeatured = searchParams.get("isFeatured");

  try {
    if (!params.storeId) {
      return new NextResponse("Store ID is required.", {
        status: 400,
      });
    }

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        sizeId,
        colorId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("[PRODUCTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
