import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { billboardId: string; storeId: string } }
) {
  try {
    if (!params.billboardId) {
      return new NextResponse("Billboard ID is required.", { status: 400 });
    }
    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.error("[BILLBOARD_" + params.billboardId + "_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { billboardId: string; storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { label, imageURL } = body;
    if (!label) {
      return new NextResponse("Name is required.", { status: 400 });
    }

    if (!imageURL) {
      return new NextResponse("Image URL is required.", { status: 400 });
    }
    if (!params.billboardId) {
      return new NextResponse("Store ID is required.", { status: 400 });
    }
    const billboard = await prismadb.billboard.updateMany({
      where: {
        id: params.billboardId,
        storeId: params.storeId,
      },
      data: {
        label,
        imageURL,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.error("[BILLBOARD_" + params.billboardId + "_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { billboardId: string; storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!params.billboardId) {
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
    const billboard = await prismadb.billboard.deleteMany({
      where: {
        id: params.billboardId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.error("[BILLBOARD_" + params.billboardId + "_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
