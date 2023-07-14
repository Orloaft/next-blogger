import { connectToDatabase } from "@/utils/db";
import { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { Layout } from "@/components/layout";
import Output from "@/components/Output/Output";
import { JSONContent } from "@tiptap/react";
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
  return (
    <Layout>
      <Head>
        <title>My Blog</title>
      </Head>
      <div className="posts">
        {posts.map((post) => (
          <div key={post._id}>
            <Output json={post.content} />
            <h2>{post.title}</h2>
            <p>{post.date}</p>
          </div>
        ))}
      </div>
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
