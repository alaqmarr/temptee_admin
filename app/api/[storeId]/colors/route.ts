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
  let existingBillboard = await prismadb.color.findFirst({
    where: { name: slug, storeId },
  });

  let counter = 1;
  while (existingBillboard) {
    slug = `${generateSlug(label)}_${counter}`;
    existingBillboard = await prismadb.color.findFirst({
      where: { name: slug, storeId },
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

    const { name, value } = body;
    if (!name || !value) {
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
    const uniqueSlug = await generateUniqueSlug(name, params.storeId);
    const color = await prismadb.color.create({
      data: {
        id: uniqueSlug,
        name,
        value,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.error("[COLOR_POST]", error);
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

    const colors = await prismadb.color.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(colors);
  } catch (error) {
    console.error("[COLORS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
