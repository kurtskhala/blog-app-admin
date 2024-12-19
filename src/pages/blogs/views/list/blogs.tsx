import { Button, Table } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getBlogsInAdmin } from "../../api/admin";
import { mapBlogsListForAdmin } from "../../api/admin/utils";
import { useQuery } from "@tanstack/react-query";

const { Column } = Table;

export type Blog = {
  title_en: string;
  description_en: string;
  imageUrl: string;
  createdAt: string;
  id: number;
  key: number;
};

const Blogs = () => {
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const blogs = await getBlogsInAdmin();
      return mapBlogsListForAdmin(blogs);
    },
  });

  const navigate = useNavigate();

  const handleNavigateToUserEdit = (id: string | number) => {
    navigate(`update/${id}`);
  };

  return (
    <Table
      bordered
      loading={isLoading}
      dataSource={blogs}
      title={() => (
        <Button
          onClick={() => navigate("create")}
          type="primary"
          icon={<PlusOutlined />}
        >
          Create Blog
        </Button>
      )}
    >
      <Column<Blog> title="Title" dataIndex="title_en" />
      <Column<Blog> title="Description" dataIndex="description_en" />
      <Column<Blog> title="Image URL" dataIndex="imageUrl" />
      <Column<Blog> title="Created At" dataIndex="createdAt" />
      <Column<Blog>
        title="Actions"
        render={(_, row) => {
          return (
            <EditOutlined
              className="text-xl cursor-pointer text-amber-500"
              onClick={() => {
                handleNavigateToUserEdit(row?.id);
              }}
            />
          );
        }}
      />
    </Table>
  );
};

export default Blogs;
