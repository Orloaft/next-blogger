import { connectToDatabase } from "@/utils/db";
import { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { Layout } from "@/components/layout";
interface Post {
  _id: string;
  title: string;
  image: string;
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
      <div className="grid grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post._id}>
            <img src={post.image} alt={post.title} />
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
