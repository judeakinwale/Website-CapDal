"use client";

import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  Trash2,
  AlertTriangle,
} from "lucide-react";

type Variant = "delete" | "success" | "error" | "info" | "warning";

const variantConfig: Record<
  Variant,
  {
    icon: React.ElementType;
    iconColor: string;
    confirmColor: string;
    titleColor: string;
  }
> = {
  delete: {
    icon: Trash2,
    iconColor: "text-red-500",
    confirmColor: "bg-red-500 hover:bg-red-600",
    titleColor: "text-red-600",
  },
  success: {
    icon: CheckCircle2,
    iconColor: "text-green-500",
    confirmColor: "bg-green-500 hover:bg-green-600",
    titleColor: "text-green-600",
  },
  error: {
    icon: AlertCircle,
    iconColor: "text-red-500",
    confirmColor: "bg-red-500 hover:bg-red-600",
    titleColor: "text-red-600",
  },
  info: {
    icon: Info,
    iconColor: "text-blue-500",
    confirmColor: "bg-blue-500 hover:bg-blue-600",
    titleColor: "text-blue-600",
  },
  warning: {
    icon: AlertTriangle,
    iconColor: "text-yellow-500",
    confirmColor: "bg-yellow-500 hover:bg-yellow-600",
    titleColor: "text-yellow-600",
  },
};

interface ConfirmationModalProps {
  /** Optional trigger element (e.g. button or icon). If omitted, use controlled mode. */
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  variant?: Variant;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;

  confirmButtonClassName?: string;
  cancelButtonClassName?: string;
}

export function ConfirmationModal({
  trigger,
  open,
  onOpenChange,
  variant = "info",
  title = "Are you sure?",
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  confirmButtonClassName,
  cancelButtonClassName,
}: ConfirmationModalProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  const content = (
    <DialogContent className="max-w-sm rounded-2xl p-6 bg-neutral-900 text-white border border-neutral-800">
      <DialogHeader className="flex flex-col items-center space-y-3">
        <div
          className={cn("p-3 rounded-full bg-neutral-800", config.iconColor)}
        >
          <Icon size={24} />
        </div>
        <DialogTitle className={cn("text-lg font-semibold", config.titleColor)}>
          {title}
        </DialogTitle>
        {description && (
          <DialogDescription className="text-center text-neutral-400">
            {description}
          </DialogDescription>
        )}
      </DialogHeader>

      <DialogFooter className="flex justify-between mt-4 space-x-3">
        <Button
          variant="outline"
          className={cn(
            "flex-1 bg-neutral-800 text-white hover:bg-neutral-700",
            cancelButtonClassName
          )}
          onClick={onCancel}
        >
          {cancelText}
        </Button>
        <Button
          className={cn(
            "flex-1 text-white",
            config.confirmColor,
            confirmButtonClassName
          )}
          onClick={onConfirm}
        >
          {confirmText}
        </Button>
      </DialogFooter>
    </DialogContent>
  );

  if (trigger) {
    return (
      <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        {content}
      </Dialog>
    );
  }

  // Controlled mode (if trigger not provided)
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {content}
    </Dialog>
  );
}
