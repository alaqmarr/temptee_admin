import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

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

    const billboard = await prismadb.billboard.create({
      data: {
        label,
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
  