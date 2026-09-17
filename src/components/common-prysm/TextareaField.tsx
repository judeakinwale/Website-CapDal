import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";

export interface TextareaFieldProps<T extends Record<string, any>>
  extends React.ComponentProps<typeof Textarea> {
  label: ReactNode;
  name: string;
  className?: string;
  info?: ReactNode;
  formData?: T;
  setFormData?: Dispatch<SetStateAction<T>>;
  extraInputStartContent?: ReactNode;
  extraInputEndContent?: ReactNode;
}

const TextareaField = <T extends Record<string, any>>({
  label,
  name,
  className,
  info,
  formData,
  setFormData,
  extraInputStartContent,
  extraInputEndContent,
  ...props
}: TextareaFieldProps<T>) => {
  const value = props.value || formData?.[name];
  const handleChange =
    props.onChange ||
    ((e: React.ChangeEvent<HTMLTextAreaElement | any>) => {
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
        <Textarea
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

export default TextareaField;
