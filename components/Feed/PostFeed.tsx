import { PostThumbnail } from "../Thumbnail/PostThumbnail";

export const PostFeed = ({ posts }: any) => {
  return (
    <div className="posts">
      {posts &&
        posts.map((post: any) => <PostThumbnail key={post._id} {...post} />)}
    </div>
  );
};
