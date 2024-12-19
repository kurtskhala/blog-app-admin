import { useState } from "react";
import BlogsCreateUpdateForm from "../../components/form/create-update";

export type Blog = {
  created_at: string;
  description_en: string;
  description_ka: string;
  id: number;
  image_url: string;
  title_en: string;
  title_ka: string;
  user_id: string;
};

const BlogsCreateView = () => {
  const [blog] = useState<Omit<Blog, "id" | "created_at" | "user_id">>({
    description_en: "",
    description_ka: "",
    image_url: "",
    title_en: "",
    title_ka: "",
  });

  return <BlogsCreateUpdateForm initialValues={blog} />;
};

export default BlogsCreateView;
