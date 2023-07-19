import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { JSONContent } from "@tiptap/react";
import SignIn from "@/components/Auth/AccountInfo";
import { useSession } from "next-auth/react";
import { connectToDatabase } from "@/utils/db";
import { PostFeed } from "@/components/Feed/PostFeed";
import Layout from "@/components/layout";
import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/Loading/Loading";

interface Post {
  _id: string;
  title: string;
  content: JSONContent;
  date: string;
}

interface HomeProps {
  posts: Post[];
}

const Home: NextPage<HomeProps> = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const rootElement = document.documentElement;
    if (typeof window !== "undefined") {
      let theme = localStorage.getItem("theme");
      if (theme) {
        rootElement.setAttribute("data-theme", theme);
      }
    }
  }, []);
  useEffect(() => {
    axios
      .get(`/api/posts`)
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Layout>
      <Head>
        <title>My Blog</title>
      </Head>
      <div style={{ position: "absolute", bottom: "50%" }}>
        {" "}
        <SignIn />
      </div>
      <Suspense fallback={<Loading />}>
        {posts && <PostFeed posts={posts} />}
      </Suspense>
    </Layout>
  );
};

export default Home;
