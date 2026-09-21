import HomeLayout from "@/components/layout/home/layout";
import { defaultMetadata } from "@/components/metadata";
import { Metadata } from "next";
import { connection } from "next/server";
import React from "react";

export const metadata: Metadata = {
  title: defaultMetadata.baseTitle,
  description: defaultMetadata.description,
};

const Layout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  await connection();
  return <HomeLayout>{children}</HomeLayout>;
};

export default Layout;
