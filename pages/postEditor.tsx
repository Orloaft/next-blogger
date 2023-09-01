import PostEditor from "@/components/PostEditor/PostEditor";
import { JSONContent } from "@tiptap/react";
import React, { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Layout from "@/components/layout";
import { GetServerSideProps } from "next";
import { connectToDatabase } from "@/utils/db";
import { ObjectId } from "mongodb";
import { getHumanReadableDate } from "@/utils/date";

const CreatePostPage: React.FC = ({ post }: any) => {
  const [form, setForm] = useState(
    (post && post) || {
      content: {} as JSONContent,
      title: "",
      url: "",
    }
  );
  const session = useSession();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | JSONContent
  ) => {
    if ((e as React.ChangeEvent<HTMLInputElement>).target) {
      const target = e as React.ChangeEvent<HTMLInputElement>;
      setForm((prevForm: any) => ({
        ...prevForm,
        [e.target.name]: e.target.value,
      }));
    } else {
      setForm((prevForm: any) => ({ ...prevForm, content: e as JSONContent }));
    }
  };

  const user = session.data?.user;

  const handlePublish = async () => {
    axios
      .post("./api/post", {
        title: form.title,
        author: user && user.name,
        content: form.content,
        imageUrl: form.url,
      })
      .then((res) => {
        setForm({ content: {}, title: "", url: "" });
        alert("Your post has been successfully sent for review");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Layout>
      <div
        style={{ display: "flex", flexDirection: "column", marginTop: "15%" }}
      >
        <div className="thumbnail">Post Editor</div>
        <div className="editorContainer">
          <input
            onChange={handleChange}
            name="title"
            type="text"
            placeholder="title"
            value={form.title}
          />
          <input
            onChange={handleChange}
            name="url"
            type="text"
            placeholder="thumbnail Image"
            value={form.url}
          />
          <PostEditor content={form.content} onChange={handleChange} />
        </div>
        <button onClick={handlePublish}>Publish</button>
      </div>
    </Layout>
  );
};

export default CreatePostPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;
  const db = await connectToDatabase();
  const collection = db.collection("Posts");
  const post = await collection.findOne({
    _id: new ObjectId(id as string),
  });

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
