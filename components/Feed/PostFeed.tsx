import { useRouter } from "next/router";

export const PostFeed = ({ posts }: any) => {
  const router = useRouter();
  console.log(posts);
  return (
    <div className="posts">
      {posts &&
        posts.map((post: any) => (
          <div
            className="thumbnail"
            key={post._id}
            onClick={() => {
              router.push(`/posts/` + post._id);
            }}
          >
            <h2>{post.title}</h2>
            <p>{post.date}</p>
            <p>{post.author}</p>
          </div>
        ))}
    </div>
  );
};
