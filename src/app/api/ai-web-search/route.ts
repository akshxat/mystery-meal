import { NextApiRequest, NextApiResponse } from "next";
import { fetchResponse } from "../../../utils/aiWebSearch";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const searchInput = searchParams.get("search")?.toString();

  try {
    const searchOutput = await fetchResponse(searchInput || "");
    console.log("🚀 ~ GET ~ searchOutput:", searchOutput)

    // Return the response with a 200 status
    return NextResponse.json(searchOutput, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);

    // Return an error response with a 500 status
    return new NextResponse(
      error instanceof Error ? error.message : "Failed to fetch places",
      { status: 500 },
    );
  }
}
