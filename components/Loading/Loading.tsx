import React from "react";

const Loading: React.FC = () => {
  return (
    <label
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      Fetching posts
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </label>
  );
};

export default Loading;
