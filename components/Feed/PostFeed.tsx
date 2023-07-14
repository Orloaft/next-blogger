import { connectToDatabase } from "@/utils/db";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next/types";

export const PostFeed = ({ posts }: any) => {
  const router = useRouter();
  return (
    <div className="posts">
      {posts.map((post: any) => (
        <div
          className="thumbnail"
          key={post._id}
          onClick={() => {
            router.push(`/posts/` + post._id);
          }}
        >
          <h2>{post.title}</h2>
          <p>{post.date}</p>
        </div>
      ))}
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async () => {
  const db = await connectToDatabase();
  const collection = db.collection("Posts");
  const posts = await collection.find().toArray();

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
};
