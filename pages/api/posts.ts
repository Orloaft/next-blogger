import { connectToDatabase } from "@/utils/db";

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.status(405).end(); // Return a 405 Method Not Allowed for non-GET requests
    return;
  }

  try {
    const db = await connectToDatabase();
    const collection = db.collection("Posts");
    const posts = await collection.find().toArray();

    res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
