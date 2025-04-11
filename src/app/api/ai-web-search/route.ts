import { NextApiRequest, NextApiResponse } from "next";
import { fetchResponse } from "../../../utils/aiWebSearch";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Parse the JSON body from the request
    const body = await req.json();
    const { restaurantsData, searchData } = body;

    if (!searchData || typeof searchData !== "string") {
      return NextResponse.json({ error: "Invalid or missing 'search' parameter" }, { status: 400 });
    }

    // Call the fetchResponse function with the search input
    const searchOutput = await fetchResponse(restaurantsData, searchData);
    console.log("🚀 ~ POST ~ searchOutput:", searchOutput);

    return NextResponse.json({ result: searchOutput }, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to process request" },
      { status: 500 }
    );
  }
}
