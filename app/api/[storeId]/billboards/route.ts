import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Function to generate the initial slug from the label
function generateSlug(label: string) {
  return label
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "");
}

// Function to ensure the slug is unique by appending a number if necessary
async function generateUniqueSlug(label: string, storeId: string) {
  let slug = generateSlug(label);
  let existingBillboard = await prismadb.billboard.findFirst({
    where: { label: slug, storeId },
  });

  let counter = 1;
  while (existingBillboard) {
    slug = `${generateSlug(label)}_${counter}`;
    existingBillboard = await prismadb.billboard.findFirst({
      where: { label: slug, storeId },
    });
    counter++;
  }

  return slug;
}

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
    const { label, imageURL } = body;

    if (!label || !imageURL) {
      return new NextResponse("Label and Image URL are required.", {
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

    if (!params.storeId) {
      return new NextResponse("Store ID is required.", {
        status: 400,
      });
    }

    // Generate unique slug for the billboard label
    const uniqueSlug = await generateUniqueSlug(label, params.storeId);

    const billboard = await prismadb.billboard.create({
      data: {
        id: uniqueSlug,
        label: label,
        imageURL,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.error("[BILLBOARDS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store ID is required.", {
        status: 400,
      });
    }

    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.error("[BILLBOARDS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
