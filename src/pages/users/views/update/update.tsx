import UsersCreateUpdateForm from "../../components/form/create-update";
import { getSingleUserInAdmin } from "@/pages/users/api/admin";
import { useParams } from "react-router-dom";
import UsersCreateUpdateFormSkeleton from "../../components/form/create-update/sceleton";
import { useQuery } from "@tanstack/react-query";

const UsersUpdateView = () => {
  const { id } = useParams();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const response = await getSingleUserInAdmin(id as string);
      return {
        email: response?.email || "",
        phone: response?.phone || "",
      };
    },
    enabled: !!id,
    retry: 1,
  });

  return (
    <>
      {isLoading ? (
        <UsersCreateUpdateFormSkeleton />
      ) : (
        <UsersCreateUpdateForm initialValues={user} />
      )}
    </>
  );
};

export default UsersUpdateView;
