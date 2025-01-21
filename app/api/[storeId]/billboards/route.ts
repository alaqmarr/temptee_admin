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

// Function to ensure the slug is unique by appending the store ID and checking the database
async function generateUniqueSlug(label: string, storeId: string) {
  const baseSlug = generateSlug(label);
  let uniqueSlug = baseSlug + "-" + storeId;

  // Check if the generated slug exists in the database
  const existingSlug = await prismadb.billboard.findFirst({
    where: { id: uniqueSlug },
  });

  // If it already exists, append a counter
  let counter = 1;
  while (existingSlug) {
    uniqueSlug = `${baseSlug}-${storeId}-${counter}`;
    const existingSlug = await prismadb.billboard.findFirst({
      where: { id: uniqueSlug },
    });
    counter++;
  }

  return uniqueSlug;
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

    // Validate required fields
    if (!label || !imageURL) {
      return new NextResponse("Label and Image URL are required.", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store ID is required.", { status: 400 });
    }

    // Check if the store belongs to the authenticated user
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Store not found", { status: 404 });
    }

    // Generate a unique slug for the billboard label
    const uniqueSlug = await generateUniqueSlug(label, params.storeId);

    // Create the new billboard in the database
    const billboard = await prismadb.billboard.create({
      data: {
        id: uniqueSlug, // Use the unique slug as the ID
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
      return new NextResponse("Store ID is required.", { status: 400 });
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
