import UsersCreateUpdateForm from "../../components/form/create-update";

const UsersCreateView = () => {
  const initialValues = {
    email: "",
    phone: "",
  };

  return <UsersCreateUpdateForm initialValues={initialValues} />;
};

export default UsersCreateView;
