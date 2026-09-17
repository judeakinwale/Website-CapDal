"use client";

import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Asterisk } from "lucide-react";
import { TextareaHTMLAttributes } from "react";

interface TextareaFieldProps<
  TFieldValues extends FieldValues,
> extends React.ComponentProps<"textarea"> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

function TextareaField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  placeholder,
  required,
  disabled,
  className,
  ...props
}: TextareaFieldProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.error ? true : undefined}
          data-disabled={disabled ? true : undefined}
          className={className}
        >
          {label && (
            <FieldLabel>
              {label}
              {required && (
                <span className="text-destructive">
                  <Asterisk className="w-2 h-2" />
                </span>
              )}
            </FieldLabel>
          )}
          <Textarea
            {...field}
            placeholder={placeholder}
            disabled={disabled}
            aria-invalid={!!fieldState.error}
            aria-required={required}
            {...props}
          />
          {description && <FieldDescription>{description}</FieldDescription>}
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}

export { TextareaField };
