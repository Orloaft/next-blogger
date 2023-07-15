import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, content, author } = req.body;

  // Connect to the MongoDB database
  const db = await connectToDatabase();
  const collection = db.collection("Posts");

  // Create a new post document
  const newPost = {
    title,
    author,
    date: new Date(),
    content,
  };

  // Insert the new post document into the collection
  let result = await collection.insertOne(newPost);
  console.log(result);
  res
    .status(201)
    .json({ message: "Post created successfully", result: result });
}
