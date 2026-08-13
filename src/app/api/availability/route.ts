// import { NextResponse } from "next/server";
// import { getAvailableSlots } from "@/services/availability.logic";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);

//   const businessId = searchParams.get("businessId")!;
//   const date = searchParams.get("date")!;
//   const duration = Number(searchParams.get("duration"));

//   const slots = await getAvailableSlots({
//     businessId,
//     date,
//     serviceDuration: duration,
//   });

//   return NextResponse.json(slots);
// }