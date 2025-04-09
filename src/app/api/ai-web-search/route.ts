import { NextApiRequest, NextApiResponse } from "next";
import { fetchResponse } from "../../../utils/aiWebSearch";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const searchInput = searchParams.get("search")?.toString();

//   try {
//     const searchOutput = await fetchResponse(searchInput || "");
//     console.log("🚀 ~ GET ~ searchOutput:", searchOutput)

//     // Return the response with a 200 status
//     return NextResponse.json(searchOutput, { status: 200 });
//   } catch (error) {
//     console.error("API Error:", error);

//     // Return an error response with a 500 status
//     return new NextResponse(
//       error instanceof Error ? error.message : "Failed to fetch places",
//       { status: 500 },
//     );
//   }
// }


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { search } = req.body;
      if (!search) {
        return res;
      }

      const response = await fetchResponse(search);
      return res.status(200).json({ result: response });
    } catch (error) {
      console.error("Error in AI Web Search API:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
