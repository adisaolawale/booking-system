

import { NextResponse } from "next/server";
import { createService, getServices } from "@/services/service.service";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const businessId = searchParams.get("businessId");
  if (!businessId) {
    return NextResponse.json(
      { error: "businessId is required" },
      { status: 400 }
    );
  }

  const services = await getServices(businessId!);
  return NextResponse.json(services);
}

export async function POST(req: Request) {
  const body = await req.json();
  const service = await createService(body);

  return NextResponse.json(service);
}