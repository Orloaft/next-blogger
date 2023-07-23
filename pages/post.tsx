import PostEditor from "@/components/PostEditor/PostEditor";
import { JSONContent } from "@tiptap/react";
import React, { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Layout from "@/components/layout";

const CreatePostPage: React.FC = () => {
  const [form, setForm] = useState({
    content: {} as JSONContent,
    title: "",
    url: "",
  });
  const session = useSession();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | JSONContent
  ) => {
    if ((e as React.ChangeEvent<HTMLInputElement>).target) {
      const target = e as React.ChangeEvent<HTMLInputElement>;
      setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
    } else {
      setForm((prevForm) => ({ ...prevForm, content: e as JSONContent }));
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
