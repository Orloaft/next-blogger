import { getHumanReadableDate } from "@/utils/date";
import { JSONContent } from "@tiptap/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export interface Post {
  title: string;
  date: string | Date;
  author: string;
  imageUrl: string;
  content: JSONContent;
  _id: any;
}
export const PostThumbnail: React.FC<Post> = ({
  title,
  date,
  author,
  imageUrl,
  _id,
}: Post) => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div
      className="thumbnail"
      onClick={() => {
        router.push(`/posts/` + _id);
      }}
    >
      <img src={imageUrl} alt="Post Thumbnail" />
      <div>
        {" "}
        <h2>{title}</h2>
        <div>
          {" "}
          <p>{getHumanReadableDate(new Date(date))}</p>
          <p>{author}</p>
        </div>
        {session && session.user?.name === author && (
          <div
            onClick={() => {
              router.push(`/postEditor?id=` + _id);
            }}
          >
            edit
          </div>
        )}
      </div>
    </div>
  );
};
