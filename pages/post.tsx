import Output from "@/components/Output/Output";
import PostEditor from "@/components/PostEditor/PostEditor";
import { Layout } from "@/components/Layout";
import { Editor, JSONContent } from "@tiptap/react";
import React, { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
const CreatePostPage: React.FC = () => {
  const [content, setContent] = useState<JSONContent>({});
  const [title, setTitle] = useState("");
  const session = useSession();
  const handleChange = (updatedContent: JSONContent) => {
    setContent(updatedContent);
  };
  const user = session.data?.user;
  const handlePublish = async () => {
    axios
      .post("./api/post", {
        title: title,
        author: user && user.name,
        content: content,
      })
      .then((res) => {})
      .catch((err) => console.log(err));
  };

  return (
    <Layout>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="thumbnail">Post Editor</div>
        <div className="editorContainer">
          <input
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            type="text"
            placeholder="title"
          ></input>
          <PostEditor onChange={handleChange} />
        </div>{" "}
        <button onClick={handlePublish}>Publish</button>
      </div>
    </Layout>
  );
};

export default CreatePostPage;
