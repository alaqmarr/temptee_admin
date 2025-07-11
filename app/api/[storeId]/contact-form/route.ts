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
  const existingSlug = await prismadb.color.findFirst({
    where: { id: baseSlug },
  });
  if (!existingSlug) {
    return baseSlug; // If unique, return the base slug
  }

  // If not unique, append the store ID to make it unique
  let uniqueSlug = `${baseSlug}-${storeId}`;
  let counter = 1;

  // Check if the slug with store ID is unique, if not, add a counter
  while (await prismadb.color.findFirst({ where: { id: uniqueSlug } })) {
    uniqueSlug = `${baseSlug}-${storeId}-${counter}`;
    counter++;
  }

  return uniqueSlug;
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const storeId = params.storeId;
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Generate a unique slug for the color
    const uniqueSlug = await generateUniqueSlug(name, params.storeId);

    // Create the new color in the database
    const color = await prismadb.contactFormData.create({
      data: {
        id: uniqueSlug,
        name,
        email,
        message,
        storeId: storeId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.error("[CONTACT_POST]", error);
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

    const colors = await prismadb.contactFormData.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(colors);
  } catch (error) {
    console.error("[CONTACT_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
