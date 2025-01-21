import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
){
    try {
        if (!params.storeId) {
            return new NextResponse("Store ID is required.", {
                status: 400,
            });
        }

        const store = await prismadb.store.findUnique({
            where: {
                id: params.storeId,
            },
            include:{
                billboards: true,
                categories: true,
                products: true,
                sizes: true,
                colors: true,
            }
        });

        return NextResponse.json(store);
    } catch (error) {
        console.error("[STOREID_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}