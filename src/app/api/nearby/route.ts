import { NextApiRequest, NextApiResponse } from "next";
import { getNearbyPlaces } from "../../../utils/nearbyPlace";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const _lat = searchParams.get("lat");
  const _lng = searchParams.get("lng");
  const _radius = searchParams.get("radius") || "1000";
  const _type = searchParams.get("type") || "restaurant";
  const _maxPrice = searchParams.get("maxprice") || 0;

  if (!_lat || !_lng) {
    return NextResponse.json(
      { error: "Latitude and longitude are required" },
      { status: 400 },
    );
  }

  try {
    const places = await getNearbyPlaces(
      { lat: _lat, lng: _lng },
      Number(_radius),
      _type,
      Number(_maxPrice),
    );

    if (!Array.isArray(places)) {
      return NextResponse.json(
        { error: "Invalid data format" },
        { status: 500 },
      );
    }

    return NextResponse.json(places, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch places" },
      { status: 500 },
    );
  }
}
