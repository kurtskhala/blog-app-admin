import dayjs from "dayjs";
import { User } from "../admin";

export const mapUsersListForAdmin = (users: User[]) => {
  return users?.map((user) => ({
    email: user?.email,
    createdAt: dayjs(user?.created_at).format("YYYY-MM-DD HH:mm"),
    phone: user?.phone,
    lastSignIn: dayjs(user?.last_sign_in_at).format("YYYY-MM-DD HH:mm"),
    id: user?.id,
    key: user?.id,
  }));
};
