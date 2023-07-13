import PostEditor from "@/components/PostEditor/PostEditor";
import React, { useState } from "react";

const CreatePostPage: React.FC = () => {
  const [content, setContent] = useState("");

  const handleSave = (updatedContent: string) => {
    setContent(updatedContent);
  };

  const handlePublish = () => {
    // Perform save or publish actions with the content
  };

  return (
    <>
      <div
        style={{
          border: " 2px solid black",
          borderRadius: ".5rem",
          padding: "1rem",
          maxWidth: "40vw",
          minHeight: "50vh",
        }}
      >
        <PostEditor />
      </div>{" "}
      <button onClick={handlePublish}>Publish</button>
    </>
  );
};

export default CreatePostPage;
