import { connectToDatabase } from "@/utils/db";

export default async function handler(req: any, res: any) {
  const db = await connectToDatabase();
  const collection = db.collection("Posts");
  const posts = await collection.find().toArray();

  res.status(200).json({ posts });
}
