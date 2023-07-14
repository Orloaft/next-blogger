import Output from "@/components/Output/Output";
import PostEditor from "@/components/PostEditor/PostEditor";
import { Layout } from "@/components/Layout";
import { Editor, JSONContent } from "@tiptap/react";
import React, { useState } from "react";
import axios from "axios";
const CreatePostPage: React.FC = () => {
  const [content, setContent] = useState<JSONContent>({});

  const handleChange = (updatedContent: JSONContent) => {
    setContent(updatedContent);
    console.log(content);
  };

  const handlePublish = async () => {
    axios
      .post("./api/post", { title: "testy", content: content })
      .then((res) => {})
      .catch((err) => console.log(err));
  };

  return (
    <Layout>
      <div
        style={{
          background: "white",
          width: "15%",
          borderRadius: ".25rem",
          display: "flex",
          height: "2rem",
          justifyContent: "center",
          border: " 2px solid black",
          alignItems: "center",
        }}
      >
        Post Editor
      </div>
      <div
        style={{
          border: " 2px solid black",
          borderRadius: ".5rem",
          padding: "1rem",
          maxWidth: "40vw",
          minHeight: "50vh",
          background: "white",
          margin: "1rem",
        }}
      >
        <PostEditor onChange={handleChange} />
      </div>{" "}
      <button onClick={handlePublish}>Publish</button>
    </Layout>
  );
};

export default CreatePostPage;
