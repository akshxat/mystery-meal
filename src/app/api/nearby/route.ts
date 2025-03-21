import { NextApiRequest, NextApiResponse } from "next";
import { getNearbyPlaces } from "../../../utils/nearbyPlace";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const radius = searchParams.get("radius") || "1000";
  const type = searchParams.get("type") || "restaurant";

  if (!lat || !lng) {
    return NextResponse.json({ error: "Latitude and longitude are required" }, { status: 400 });
  }

  try {
    const places = await getNearbyPlaces(
      { lat: lat, lng: lng },
      Number(radius),
      type
    );

    if (!Array.isArray(places)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 500 });
    }

    return NextResponse.json(places, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to fetch places" }, { status: 500 });
  }
}