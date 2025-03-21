import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db("mysteryMeal");

    const usersData = await db
      .collection("users")
      .find({})
      .sort({ metacritic: -1 })  // Ensure this field exists
      .limit(10)
      .toArray();

    // Add proper status and content-type headers
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(usersData);

  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
