import Output from "@/components/Output/Output";
import { Layout } from "@/components/Layout";
import { connectToDatabase } from "@/utils/db";
import { JSONContent } from "@tiptap/react";
import { ObjectId } from "mongodb";
import { GetServerSideProps } from "next";

export default function PostView({ postContent }: JSONContent) {
  return (
    <Layout>
      <div className="posts">
        {postContent && <Output json={postContent} />}
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { postId } = query;
  const db = await connectToDatabase();
  const collection = db.collection("Posts");
  const post = await collection.findOne({
    _id: new ObjectId(postId as string),
  });

  return {
    props: {
      postContent: post?.content || null,
    },
  };
};
