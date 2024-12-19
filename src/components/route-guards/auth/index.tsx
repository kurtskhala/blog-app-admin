import { userAtom } from "@/store/auth";
import { useAtomValue } from "jotai";
import { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const user = useAtomValue(userAtom);  

  if (!user) {
    return <Navigate to={`/login`} />;
  }

  return children || <Outlet />;
};

export default AuthGuard;
