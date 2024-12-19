import { getUsersListInAdmin } from "../../api/admin";
import { Button, Table } from "antd";
import { mapUsersListForAdmin } from "../../api/admin/utils";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const { Column } = Table;

type User = {
  email: string;
  createdAt: string;
  phone: string;
  lastSignIn: string;
  id: string;
};

const Users = () => {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const users = await getUsersListInAdmin();
      return mapUsersListForAdmin(users);
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
      dataSource={users}
      title={() => (
        <Button
          type="primary"
          onClick={() => navigate("create")}
          icon={<PlusOutlined />}
        >
          Create User
        </Button>
      )}
    >
      <Column<User> title="EMail" dataIndex="email" />
      <Column<User> title="Created At" dataIndex="createdAt" />
      <Column<User> title="Phone" dataIndex="phone" />
      <Column<User> title="Last Sign In" dataIndex="lastSignIn" />
      <Column<User>
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

export default Users;
