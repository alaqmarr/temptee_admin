import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await prismadb.notifications.updateMany({
      where: {
        id: id,
      },
      data: {
        read: true,
      },
    });
    return NextResponse.json({ message: "Notification marked as read" });
  } catch (error: any) {
    return NextResponse.json({
      message: "Failed to mark notification as read",
    });
  }
}
