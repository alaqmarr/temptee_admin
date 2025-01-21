import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Function to generate a slug from a label
function generateSlug(label: string): string {
  return label
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w\-]/g, ""); // Remove non-word characters
}

// Function to ensure the slug is unique by appending store ID or counter if necessary
async function generateUniqueSlug(label: string, storeId: string): Promise<string> {
  const baseSlug = generateSlug(label);

  // Check if the base slug is already unique
  const existingSlug = await prismadb.size.findFirst({ where: { id: baseSlug } });
  if (!existingSlug) {
    return baseSlug; // Return the base slug if it's unique
  }

  // If not unique, append the store ID and/or counter
  let uniqueSlug = `${baseSlug}-${storeId}`;
  let counter = 1;

  while (await prismadb.size.findFirst({ where: { id: uniqueSlug } })) {
    uniqueSlug = `${baseSlug}-${storeId}-${counter}`;
    counter++;
  }

  return uniqueSlug;
}

// POST API Endpoint
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

    // Validate required fields
    if (!name || !value) {
      return new NextResponse("Label and Image URL are required.", { status: 400 });
    }

    // Validate store ownership
    const storeByUserId = await prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse("Store not found", { status: 404 });
    }

    // Generate a unique slug
    const uniqueSlug = await generateUniqueSlug(name, params.storeId);

    // Create the size entry
    const size = await prismadb.size.create({
      data: {
        id: uniqueSlug, // Use the unique slug as the ID
        name,
        value,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.error("[SIZE_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// GET API Endpoint
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // Validate store ID
    if (!params.storeId) {
      return new NextResponse("Store ID is required.", { status: 400 });
    }

    // Fetch sizes for the store
    const sizes = await prismadb.size.findMany({
      where: { storeId: params.storeId },
    });

    return NextResponse.json(sizes);
  } catch (error) {
    console.error("[SIZES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
