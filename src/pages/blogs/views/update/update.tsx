import { useParams } from "react-router-dom";
import BlogsCreateUpdateFormSkeleton from "../../components/form/create-update/skileton";
import BlogsCreateUpdateForm from "../../components/form/create-update";
import { getSingleBlogInAdmin } from "../../api/admin";
import { useQuery } from "@tanstack/react-query";

const BlogsUpdateView = () => {
  const { id } = useParams();

  const { data: blog, isLoading } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const response = await getSingleBlogInAdmin(id as string);
      return {
        title_en: response?.title_en || "",
        title_ka: response?.title_ka || "",
        description_en: response?.description_en || "",
        description_ka: response?.description_ka || "",
        image_url: response?.image_url || "",
      };
    },
    enabled: !!id,
  });

  return (
    <>
      {isLoading ? (
        <BlogsCreateUpdateFormSkeleton />
      ) : (
        <BlogsCreateUpdateForm initialValues={blog} />
      )}
    </>
  );
};

export default BlogsUpdateView;
