import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { id } = await req.json();
  await prismadb.notifications.updateMany({
    where: {
      id: id,
    },
    data: {
      read: true,
    },
  });
  return NextResponse.json({ message: "Notification marked as read" });
}
