import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Function to generate the initial slug from the name
function generateSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "");
}

// Function to ensure the slug is unique by appending a number if necessary
async function generateUniqueSlug(name: string) {
  let slug = generateSlug(name);
  let existingStore = await prismadb.store.findUnique({
    where: { id: slug },
  });

  let counter = 1;
  while (existingStore) {
    slug = `${generateSlug(name)}_${counter}`;
    existingStore = await prismadb.store.findUnique({
      where: { id: slug },
    });
    counter++;
  }

  return slug;
}

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name } = body;

    if (!name) {
      return new NextResponse("Name is required.", { status: 400 });
    }

    // Generate unique slug for the store
    const slug = await generateUniqueSlug(name);

    const store = await prismadb.store.create({
      data: {
        id: slug, // Use the generated slug as the id
        name,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.error("[STORES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
