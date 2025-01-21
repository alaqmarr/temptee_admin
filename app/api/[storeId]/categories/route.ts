import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Function to generate the initial slug from the label
function generateSlug(label: string) {
  return label
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, ""); // Remove non-word characters
}

// Function to ensure the slug is unique by appending the store ID if necessary
async function generateUniqueSlug(label: string, storeId: string) {
  const baseSlug = generateSlug(label);

  // Check if the base slug already exists in the database
  const existingSlug = await prismadb.category.findFirst({ where: { id: baseSlug } });
  if (!existingSlug) {
    return baseSlug; // If unique, return the base slug
  }

  // If not unique, append the store ID to make it unique
  let uniqueSlug = `${baseSlug}-${storeId}`;
  let counter = 1;

  // Check if the slug with store ID is unique, if not, add a counter
  while (await prismadb.category.findFirst({ where: { id: uniqueSlug } })) {
    uniqueSlug = `${baseSlug}-${storeId}-${counter}`;
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
    const { name, billboardId } = body;

    // Validate required fields
    if (!name || !billboardId) {
      return new NextResponse("Billboard Id or name is missing.", { status: 400 });
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

    // Generate a unique slug for the category
    const uniqueSlug = await generateUniqueSlug(name, params.storeId);

    // Create the new category in the database
    const category = await prismadb.category.create({
      data: {
        id: uniqueSlug, // Use the unique slug as the ID
        name,
        billboardId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("[CATEGORIES_POST]", error);
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

    const categories = await prismadb.category.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("[CATEGORY_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
