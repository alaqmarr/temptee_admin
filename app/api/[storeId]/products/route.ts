import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Function to generate a slug from a label
function generateSlug(label: string): string {
  return label
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w\-]/g, ""); // Remove non-word characters
}

// Function to ensure the slug is unique by appending store ID or counter if necessary
async function generateUniqueSlug(label: string, storeId: string): Promise<string> {
  const baseSlug = generateSlug(label);

  // Check if the base slug is already unique
  const existingSlug = await prismadb.product.findFirst({ where: { id: baseSlug } });
  if (!existingSlug) {
    return baseSlug; // Return the base slug if it's unique
  }

  // If not unique, append the store ID and/or counter
  let uniqueSlug = `${baseSlug}-${storeId}`;
  let counter = 1;

  while (await prismadb.product.findFirst({ where: { id: uniqueSlug } })) {
    uniqueSlug = `${baseSlug}-${storeId}-${counter}`;
    counter++;
  }

  return uniqueSlug;
}

// POST API Endpoint for creating a product
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
      description,
      quantity,
    } = body;

    // Validate required fields
    if (!name) {
      return new NextResponse("Name is required.", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required.", { status: 400 });
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
      return new NextResponse("Store ID is required.", { status: 400 });
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

    // Generate a unique slug for the product
    const uniqueSlug = await generateUniqueSlug(name, params.storeId);

    // Create the product
    const product = await prismadb.product.create({
      data: {
        id: uniqueSlug, // Use the unique slug as the ID
        name,
        price,
        categoryId,
        sizeId,
        colorId,
        isFeatured,
        isArchived,
        description,
        quantity,
        storeId: params.storeId,
        images: {
          createMany: {
            data: images.map((image: { url: string }) => image),
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

// GET API Endpoint for fetching products
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
      return new NextResponse("Store ID is required.", { status: 400 });
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
