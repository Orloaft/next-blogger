import { getHumanReadableDate } from "@/utils/date";
import { useRouter } from "next/router";

interface Post {
  title: string;
  date: string;
  author: string;
  imageUrl: string;
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
      </div>
    </div>
  );
};
