import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

export interface InputFieldProps<T extends Record<string, any>>
  extends React.ComponentProps<typeof Input> {
  label: ReactNode;
  name: string;
  className?: string;
  info?: ReactNode;
  formData?: T;
  setFormData?: Dispatch<SetStateAction<T>>;
  extraInputStartContent?: ReactNode;
  extraInputEndContent?: ReactNode;
}

const InputField = <T extends Record<string, any>>({
  label,
  name,
  className,
  info,
  formData,
  setFormData,
  extraInputStartContent,
  extraInputEndContent,
  ...props
}: InputFieldProps<T>) => {
  const value = props.value || formData?.[name];
  const handleChange =
    props.onChange ||
    ((e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData?.((prev: T) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    });

  const placeholder = props.placeholder ?? label;
  return (
    <div className="grid gap-2">
      <Label className="text-xs" htmlFor={name}>
        {label}
      </Label>
      <div className="relative flex items-center">
        {extraInputStartContent}
        <Input
          id={name}
          name={name}
          className={cn("border-white/10 placeholder:text-white/40", className)}
          placeholder={typeof placeholder === "string" ? placeholder : ""}
          value={value}
          onChange={handleChange}
          {...props}
        />
        {extraInputEndContent}
      </div>
      {info && <div className="">{info}</div>}
    </div>
  );
};

export default InputField;
