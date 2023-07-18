import Output from "@/components/Output/Output";
import { Layout } from "@/components/Layout";
import { connectToDatabase } from "@/utils/db";
import { JSONContent } from "@tiptap/react";
import { ObjectId } from "mongodb";
import { GetServerSideProps } from "next";
import CommentSection from "@/components/Comment/Comment";
import { getHumanReadableDate } from "@/utils/date";

export default function PostView({ post }: any) {
  return (
    <Layout>
      {post && (
        <div className="post">
          <div className="intro">
            <div>
              {" "}
              <h2>{post.title}</h2>
              <div>
                {" "}
                <p>{post.date}</p>
                <p>{post.author}</p>
              </div>
            </div>
          </div>
          <Output json={post.content} />
          <CommentSection />
        </div>
      )}
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
  console.log(post);
  return {
    props: {
      post: {
        ...post,
        _id: post && post._id.toString(),
        date: post && getHumanReadableDate(post.date),
      },
    },
  };
};
