import React from "react";
import { PackageOpen, TriangleAlert } from "lucide-react";

export interface NoItemFoundProps {
  text?: string;
}

const NoItemFound = ({ text = "No Items Found" }: NoItemFoundProps) => {
  return (
    <div className="overflow-hidden w-full h-125 relative flex items-center justify-center gap-4 p-12 bg-white text-black/80">
      <div className="w-full max-w-xl h-full flex items-center justify-center text-[5vw] font-semibold text-center">
        {text}
      </div>
      <div className="w-full max-w-xl h-full flex items-center justify-center">
        <TriangleAlert className="w-100 h-100" />
      </div>

      <div className="absolute inset-0 -top-3/4 left-1/4 w-full h-full opacity-5">
        <TriangleAlert className="w-6xl aspect-square h-300" />
        {/* <PackageOpen className="w-6xl aspect-square h-300" /> */}
      </div>
    </div>
  );
};

export default NoItemFound;
