"use client";

import { ChangeEvent, FC, MouseEvent, useState } from "react";
import Link from "next/link";
import { Button, Input, Label } from "@/components/ui";
import { useAlert, useAuth } from "@/hooks";

interface Props {
  pageType: "admin" | "user";
}

const LoginPage: FC<Props> = ({ pageType }) => {
  const { fetchLogin } = useAuth();
  const { addAlert } = useAlert();

  const [userInfo, setUserInfo] = useState({
    id: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserInfo({ ...userInfo, [id]: value });
  };

  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!userInfo.id || !userInfo.password) {
      addAlert({
        message: "Please enter your id and password",
        status: "error",
      });
      return;
    }

    fetchLogin(userInfo);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center py-12">
      <div className="grid w-[350px] gap-6 p-10 border rounded-sm">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">{pageType === "admin" ? "Admin " : ""}Login</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter your id below to login to your account
          </p>
        </div>
        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="id" size="sm">
              Id
            </Label>
            <Input id="id" type="id" required onChange={handleChange} />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password" size="sm">
                Password
              </Label>
            </div>
            <Input id="password" type="password" required onChange={handleChange} />
          </div>
          <Button type="submit" className="w-full" onClick={handleLogin}>
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </form>

        {/* Admin <-> User 페이지 이동 */}
        <Link href={pageType === "admin" ? "/login" : "/admin/login"}>
          <Button variant="outline" className="w-full">
            {pageType === "admin" ? "User" : "Admin"} 페이지로...!
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
