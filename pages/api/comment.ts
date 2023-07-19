import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/db";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { postId, comment } = req.body;

  try {
    // Connect to the MongoDB database
    const db = await connectToDatabase();
    const collection = db.collection("Posts");

    // Find the post by postId
    const post = await collection.findOne({ _id: new ObjectId(postId) });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Add the comment to the post's comments array
    post.comments.push({ ...comment, date: new Date().toDateString() });

    // Update the post document with the new comment
    let respo = await collection.updateOne(
      { _id: new ObjectId(postId) },
      { $set: { comments: post.comments } }
    );
    console.log(respo);
    return res.status(201).json({ message: "Comment added successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while adding the comment" });
  }
}
