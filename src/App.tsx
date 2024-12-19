import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminLayout from "./layouts/admin-layout";
import Users from "./pages/users/views/list/users";
import Blogs from "./pages/blogs/views/list/blogs";
import Login from "./pages/login/login";
import UsersCreateView from "./pages/users/views/create/create";
import UsersUpdateView from "./pages/users/views/update/update";
import BlogsUpdateView from "./pages/blogs/views/update/update";
import BlogsCreateView from "./pages/blogs/views/create/create";
import { useSetAtom } from "jotai";
import { userAtom } from "./store/auth";
import { useEffect } from "react";
import { supabase } from "./supabase";
import AuthGuard from "./components/route-guards/auth";
import AuthLayout from "./layouts/auth";
import LoginGuard from "./components/route-guards/login";

function App() {
  const setUser = useSetAtom(userAtom);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session);
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  return (
    <Routes>
      <Route index element={<Navigate to="/login" />} />

      <Route
        path=""
        element={
          <LoginGuard>
            <AuthLayout />
          </LoginGuard>
        }
      >
        <Route path="login" element={<Login />} />
      </Route>
      <Route
        path="admin"
        element={
          <AuthGuard>
            <AdminLayout />
          </AuthGuard>
        }
      >
        <Route path="users" element={<Users />} />
        <Route path="users/create" element={<UsersCreateView />} />
        <Route path="users/update/:id" element={<UsersUpdateView />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="blogs/update/:id" element={<BlogsUpdateView />} />
        <Route path="blogs/create" element={<BlogsCreateView />} />
      </Route>
    </Routes>
  );
}

export default App;
