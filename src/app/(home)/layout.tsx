import HomeLayout from "@/components/layout/home/layout";
import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <HomeLayout>{children}</HomeLayout>;
};

export default Layout;
