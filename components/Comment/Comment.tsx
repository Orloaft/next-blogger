import React, { useState } from "react";
import styles from "./styles.module.scss";
import { useSession } from "next-auth/react";
import axios from "axios";
import { getHumanReadableDate } from "@/utils/date";
import { useRouter } from "next/router";
import { profanity } from "@2toad/profanity";

interface Comment {
  user: any;
  text: string;
  date?: any;
}

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  const [expandedComments, setExpandedComments] = useState<string[]>([]);

  const toggleExpand = (commentText: string) => {
    if (expandedComments.includes(commentText)) {
      setExpandedComments(
        expandedComments.filter((text) => text !== commentText)
      );
    } else {
      setExpandedComments([...expandedComments, commentText]);
    }
  };

  const isCommentExpanded = (commentText: string) => {
    return expandedComments.includes(commentText);
  };

  return (
    <div className={styles.commentList}>
      {comments &&
        comments.map((comment, index) => (
          <div className={styles.comment} key={index}>
            <img src={comment.user.image} alt="Avatar" />
            <div className={styles.commentContent}>
              <h4>{comment.user.name}</h4>
              {isCommentExpanded(comment.text) ? (
                <p>{profanity.censor(comment.text)}</p>
              ) : (
                <p>
                  {comment.text.length > 100
                    ? `${comment.text.slice(0, 100)}...`
                    : profanity.censor(comment.text)}
                  {comment.text.length > 100 && (
                    <button
                      onClick={() => toggleExpand(comment.text)}
                      className={styles.expandButton}
                    >
                      Read more
                    </button>
                  )}
                </p>
              )}
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
  const router = useRouter();
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
        router.push(`/posts/` + postId);
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
