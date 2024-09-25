import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { colorId: string; storeId: string } }
) {
  try {
    if (!params.colorId) {
      return new NextResponse("Billboard ID is required.", { status: 400 });
    }
    const color = await prismadb.color.findUnique({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.error("[SIZE_" + params.colorId + "_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { colorId: string; storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { name, value } = body;
    if (!name) {
      return new NextResponse("Name is required.", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Image URL is required.", { status: 400 });
    }
    if (!params.colorId) {
      return new NextResponse("Store ID is required.", { status: 400 });
    }
    const color = await prismadb.color.updateMany({
      where: {
        id: params.colorId,
        storeId: params.storeId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.error("[SIZE_" + params.colorId + "_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { colorId: string; storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!params.colorId) {
      return new NextResponse("Billboard ID is required.", { status: 400 });
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
    const color = await prismadb.color.deleteMany({
      where: {
        id: params.colorId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.error("[SIZE_" + params.colorId + "_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
