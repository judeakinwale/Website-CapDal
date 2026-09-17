import React, { FC, ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CheckboxProps {
  className?: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  label?: ReactNode;
}

const Checkbox: FC<CheckboxProps> = ({
  className,
  checked,
  onChange,
  label,
}) => {
  return (
    <div
      className={cn("w-full flex items-center gap-2 cursor-pointer", className)}
      onClick={() => onChange?.(!checked)}
    >
      <Image
        src={
          checked ? "/icons/checkbox-checked-blue.svg" : "/icons/checkbox.svg"
        }
        alt="checkbox"
        width={16}
        height={16}
      />
      <span className="text-sm text-white">{label}</span>
    </div>
  );
};

export default Checkbox;
