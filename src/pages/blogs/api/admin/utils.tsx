import dayjs from "dayjs";
import { Blog } from "../admin";

export const mapBlogsListForAdmin = (blogs: Blog[]) => {
  return blogs?.map((blog) => ({
    title_en: blog?.title_en,
    description_en: blog?.description_en,
    imageUrl: blog?.image_url,
    createdAt: dayjs(blog?.created_at).format("YYYY-MM-DD HH:mm"),
    id: blog?.id,
    key: blog?.id,
  }));
};
