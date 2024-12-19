import { userAtom } from "@/store/auth";
import { useAtomValue } from "jotai";
import { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";

const LoginGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const user = useAtomValue(userAtom);

  if (user) {
    return <Navigate to={`admin/users`} />;
  }

  return children || <Outlet />;
};

export default LoginGuard;
