import { updateBlogById, createBlog } from "@/pages/blogs/api/admin";
import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { useNavigate, useParams } from "react-router-dom";

const { Item } = Form;

type BlogFormValues = {
  title_en: string;
  title_ka: string;
  description_en: string;
  description_ka: string;
  image_url: string;
};

interface BlogFormProps {
  initialValues?: Partial<BlogFormValues>;
}

const BlogsCreateUpdateForm: React.FC<BlogFormProps> = ({ initialValues }) => {
  const { id } = useParams();
  const [form] = useForm<BlogFormValues>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const handleSubmit = async (values: BlogFormValues) => {
    try {
      if (isEditMode && id) {
        await updateBlogById(Number(id), values);
        message.success("Blog updated successfully");
      } else {
        await createBlog(values);
        message.success("Blog created successfully");
      }
      navigate("/admin/blogs");
    } catch (error) {
      message.error("Failed to save blog");
      console.error("Error saving blog:", error);
    }
  };

  return (
    <Form<BlogFormValues>
      initialValues={initialValues}
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      style={{ maxWidth: 600 }}
    >
      <Item
        label="Title (English)"
        name="title_en"
        rules={[{ required: true, message: "Please enter English title" }]}
      >
        <Input placeholder="Enter title in English" />
      </Item>

      <Item
        label="Title (Georgian)"
        name="title_ka"
        rules={[{ required: true, message: "Please enter Georgian title" }]}
      >
        <Input placeholder="Enter title in Georgian" />
      </Item>

      <Item
        label="Description (English)"
        name="description_en"
        rules={[
          { required: true, message: "Please enter English description" },
        ]}
      >
        <Input.TextArea placeholder="Enter description in English" rows={4} />
      </Item>

      <Item
        label="Description (Georgian)"
        name="description_ka"
        rules={[
          { required: true, message: "Please enter Georgian description" },
        ]}
      >
        <Input.TextArea placeholder="Enter description in Georgian" rows={4} />
      </Item>

      <Item
        label="Image URL"
        name="image_url"
        rules={[{ required: true, message: "Please enter image URL" }]}
      >
        <Input placeholder="Enter image URL" />
      </Item>

      <Item>
        <Button type="primary" htmlType="submit">
          {isEditMode ? "Update" : "Create"} Blog
        </Button>
        <Button
          onClick={() => navigate("/admin/blogs")}
          style={{ marginLeft: 8 }}
        >
          Cancel
        </Button>
      </Item>
    </Form>
  );
};

export default BlogsCreateUpdateForm;
