import { createUserInAdmin, updateUserInAdmin } from "@/pages/users/api/admin";
import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { useNavigate, useParams } from "react-router-dom";

const { Item } = Form;

type UserFormValues = {
  email: string;
  phone: string;
};

type InitialValues = { email: string; phone: string };

const UsersCreateUpdateForm: React.FC<{
  initialValues?: InitialValues;
}> = ({ initialValues }) => {
  const { id } = useParams();
  const [form] = useForm<InitialValues>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const handleSubmit = (values: UserFormValues) => {
    if (isEditMode && id) {
      updateUserInAdmin(id, values);
    } else {
      createUserInAdmin(values.email, {
        data: {
          phone: values.phone,
        },
      });
    }
    navigate("/admin/users");
  };

  return (
    <Form<InitialValues>
      initialValues={initialValues}
      form={form}
      onFinish={handleSubmit}
      style={{ maxWidth: 600 }}
    >
      <Item label="Phone Number" name="phone" rules={[{ required: true }]}>
        <Input placeholder="Enter Phone Number" />
      </Item>

      <Item label="Email" name="email" rules={[{ required: true }]}>
        <Input placeholder="Enter Email" />
      </Item>

      <Item label="">
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Item>
    </Form>
  );
};

export default UsersCreateUpdateForm;
