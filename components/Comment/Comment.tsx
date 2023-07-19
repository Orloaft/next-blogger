import React, { useState } from "react";
import styles from "./styles.module.scss";
import { useSession } from "next-auth/react";
import axios from "axios";
import { getHumanReadableDate } from "@/utils/date";

interface Comment {
  user: any;
  text: string;
  date?: any;
}

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div className={styles.commentList}>
      {comments &&
        comments.map((comment, index) => (
          <div className={styles.comment} key={index}>
            <img src={comment.user.image} alt="Avatar" />
            <div className={styles.commentContent}>
              <h4>{comment.user.name}</h4>
              <p>{comment.text}</p>
              <span style={{ fontSize: ".9rem" }}>{comment.date}</span>
            </div>
          </div>
        ))}
    </div>
  );
};

interface CommentInputProps {
  onSubmit: (comment: string) => void;
}

const CommentInput: React.FC<CommentInputProps> = ({ onSubmit }) => {
  const [comment, setComment] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(comment);
    setComment("");
  };

  return (
    <form className={styles.commentInput} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Write a comment..."
        value={comment}
        onChange={handleInputChange}
      />
      <button type="submit">Post</button>
    </form>
  );
};

const CommentSection: React.FC<{ comments: any; postId: any }> = ({
  comments,
  postId,
}: any) => {
  const session = useSession();
  const handleCommentSubmit = (text: string) => {
    const newComment: Comment = {
      user: session.data && session.data.user,
      text: text,
    };
    axios
      .post(`${process.env.NEXT_PUBLIC_CLIENT}/api/comment`, {
        comment: newComment,
        postId: postId,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.commentSection}>
      <h2>Comments</h2>
      <CommentList comments={comments} />
      <CommentInput onSubmit={handleCommentSubmit} />
    </div>
  );
};

export default CommentSection;
