import { NextResponse } from "next/server";
import { createBooking } from "@/services/booking.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const booking = await createBooking(body);

    return NextResponse.json(booking);
  } catch (error: any) {
    if (error.message === "SLOT_ALREADY_BOOKED") {
      return NextResponse.json(
        { error: "This time slot is no longer available" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}