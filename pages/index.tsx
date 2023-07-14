import { NextPage } from "next";
import Head from "next/head";
import { Layout } from "@/components/Layout";
import { JSONContent } from "@tiptap/react";

import SignIn from "@/components/Auth/SignIn";
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
      <SignIn />
    </Layout>
  );
};

export default Home;
