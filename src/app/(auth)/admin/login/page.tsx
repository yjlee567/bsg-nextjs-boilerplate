import React from "react";
import { LoginPage } from "@/components/pages/shared";

export const metadata = {
  title: "BSG Portal Admin 로그인",
  description: "BSG Portal Admin 로그인",
};

const Login = () => {
  return <LoginPage pageType="admin" />;
};

export default Login;
