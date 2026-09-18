import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";

export interface SiteButtonProps extends React.ComponentProps<"button"> {
  className?: string;
  children: React.ReactNode;
  variant?:
    | "outline"
    | "dark"
    | "dark-outline"
    | "primary"
    | "primary-outline"
    | "slide";
  // size?: "small" | "default" | "large" | "custom";
  href?: string;
  onClick?: () => void;
  loading?: boolean;
}
export const SiteButton: React.FC<SiteButtonProps> = ({
  className,
  children,
  variant = "outline",
  // size = "default",
  type = "button",
  href,
  onClick,
  loading,
  ...props
}) => {
  const renderedBtn = (
    <Button
      className={cn(
        "relative group min-h-16 h-fit px-12 py-4 text-sm font-bold uppercase tracking-widest border-2 cursor-pointer transition-all duration-300",
        variant === "outline" &&
          "bg-transparent text-white border-white hover:bg-white hover:text-primary",
        variant === "dark" &&
          "bg-black text-white border-black hover:bg-white hover:text-primary hover:border-white",
        variant === "dark-outline" &&
          "bg-transparent text-black border-black hover:bg-black hover:text-white",
        variant === "primary" &&
          "bg-primary text-white hover:bg-black hover:text-white",
        variant === "primary-outline" &&
          "bg-transparent text-primary border-primary hover:bg-primary hover:text-white",
        variant === "slide" && "bg-primary text-white",
        className,
      )}
      onClick={onClick}
      type={type}
      disabled={loading} // either loading or disabled disables this btn
      {...props}
    >
      {variant === "slide" && (
        <div className="absolute top-0 left-0 w-0 h-full bg-black group-hover:w-full transition-all duration-500"></div>
      )}
      <span className="z-10">
        {loading ? <LoaderCircle className="animate-spin" /> : children}
      </span>
    </Button>
  );

  if (href) return <Link href={href}>{renderedBtn}</Link>;
  return renderedBtn;
};
