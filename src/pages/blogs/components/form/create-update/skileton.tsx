import { Form, Skeleton, Space } from "antd";

const BlogsCreateUpdateFormSkeleton = () => {
  return (
    <Form>
      <Space direction="vertical" size="large">
        <Skeleton.Input active />
        <Skeleton.Input active />
        <Skeleton.Input active />
        <Skeleton.Button active />
      </Space>
    </Form>
  );
};
export default BlogsCreateUpdateFormSkeleton;
