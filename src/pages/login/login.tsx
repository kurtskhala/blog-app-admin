import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { login } from "@/supabase/auth";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

type FieldValues = {
  email: string;
  password: string;
};

export const Login = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: handleLogin } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: () => {
      navigate(`/admin/users`);
    },
  });

  const onSubmit = (fieldValues: FieldValues) => {
    handleLogin(fieldValues);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md border-gray-800 dark:bg-gray-900">
        <CardHeader className="space-y-2">
          <CardTitle className="text-center text-2xl dark:text-white">
            Login
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Controller
            name="email"
            control={control}
            rules={{
              required: "email-required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "email-invalid",
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              console.log(error);
              return (
                <>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={value}
                    onChange={onChange}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </>
              );
            }}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: "password-required",
              minLength: {
                value: 8,
                message: "password-min-length 8",
              },
              maxLength: {
                value: 50,
                message: "password-max-length 50",
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              console.log(error);
              return (
                <>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={value}
                    onChange={onChange}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </>
              );
            }}
          />
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
