import React, { useState } from "react";
import styles from "./styles.module.scss";

interface Comment {
  user: {
    name: string;
    image: string;
  };
  text: string;
}

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div className={styles.commentList}>
      {comments.map((comment, index) => (
        <div className={styles.comment} key={index}>
          <img src={comment.user.image} alt="Avatar" />
          <div className={styles.commentContent}>
            <h4>{comment.user.name}</h4>
            <p>{comment.text}</p>
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

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);

  const handleCommentSubmit = (text: string) => {
    const newComment: Comment = {
      user: {
        name: "John Doe",
        image: "https://example.com/avatar.jpg",
      },
      text: text,
    };

    setComments((prevComments) => [...prevComments, newComment]);
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
