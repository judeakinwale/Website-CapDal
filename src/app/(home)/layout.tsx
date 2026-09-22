import HomeLayout from "@/components/layout/home/layout";
import { connection } from "next/server";
import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  await connection();
  return <HomeLayout>{children}</HomeLayout>;
};

export default Layout;
