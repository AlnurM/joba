import { toast as sonnerToast } from "sonner";
import { Check, AlertCircle } from "lucide-react";

interface ToastOptions {
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success";
}

export const useToast = () => {
  const toast = ({ title, description, variant = "default" }: ToastOptions) => {
    const baseStyles = {
      style: {
        fontSize: "14px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        padding: "12px 16px",
        border: "1px solid",
        maxWidth: "420px",
      },
    };

    if (variant === "destructive") {
      sonnerToast.error(title, {
        description,
        icon: <AlertCircle size={18} className="text-destructive" />,
        className: "border-destructive/20 bg-destructive/5",
        ...baseStyles,
      });
    } else if (variant === "success") {
      sonnerToast.success(title, {
        description,
        icon: <Check size={18} className="text-green-600" />,
        className: "border-green-600/20 bg-green-50/50",
        ...baseStyles,
      });
    } else {
      sonnerToast(title, {
        description,
        className: "border-border bg-background",
        ...baseStyles,
      });
    }
  };

  return { toast };
};
