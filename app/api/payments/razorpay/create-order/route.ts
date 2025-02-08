import { RazorpayClient } from "@/lib/payments";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const razorpay = RazorpayClient;

  if (!razorpay) {
    return NextResponse.json(
      { error: "Razorpay client not found" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: "Order created successfully",
    },
    { status: 200 }
  );
}
