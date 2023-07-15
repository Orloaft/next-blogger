import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Layout } from "@/components/Layout";
import { JSONContent } from "@tiptap/react";

import SignIn from "@/components/Auth/SignIn";
import { useSession } from "next-auth/react";
import { connectToDatabase } from "@/utils/db";
import { PostFeed } from "@/components/Feed/PostFeed";
interface Post {
  _id: string;
  title: string;
  content: JSONContent;
  date: string;
}

interface HomeProps {
  posts: Post[];
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  const { data: session } = useSession();
  return (
    <Layout>
      <Head>
        <title>My Blog</title>
      </Head>
      <div style={{ position: "absolute", bottom: "50%" }}>
        {" "}
        <SignIn />
      </div>
      {session?.user && posts && <PostFeed posts={posts} />}
    </Layout>
  );
};
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const db = await connectToDatabase();
  const collection = db.collection("Posts");
  const posts = await collection.find().toArray();

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
};

export default Home;
