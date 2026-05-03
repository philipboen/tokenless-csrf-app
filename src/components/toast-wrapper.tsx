import {
  IconAlertOctagon,
  IconAlertTriangle,
  IconCircleCheck,
  IconInfoCircle,
  IconLoader,
} from "@tabler/icons-react";
import { toast as sonnerToast } from "sonner";

import { cn } from "@/lib/utils";

type ToastType = "default" | "success" | "info" | "warning" | "error" | "loading";

interface ToastProps {
  id: string | number;
  title: string;
  description?: string;
  type?: ToastType;
  button?: {
    label: string;
    onClick: () => void;
  };
}

/** A fully custom headless toast maintaining the layout of sonner but built with your theme. */
function Toast(props: ToastProps) {
  const { title, description, button, id, type = "default" } = props;

  return (
    <div
      className={cn(
        "flex w-full md:max-w-91 gap-3 rounded-none border p-2 shadow-lg items-start",
        type === "default" && "bg-popover text-popover-foreground border-border",
        type === "success" &&
          "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
        type === "info" &&
          "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border-blue-500/30",
        type === "warning" &&
          "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-500/30",
        type === "error" &&
          "bg-destructive dark:bg-destructive text-primary-foreground border-destructive/30",
        type === "loading" && "bg-popover text-popover-foreground border-border",
      )}
    >
      {/* Icon placement replicating sonner */}
      <div className="mt-0.5 shrink-0">
        {type === "success" && <IconCircleCheck className="size-5" />}
        {type === "info" && <IconInfoCircle className="size-5" />}
        {type === "warning" && <IconAlertTriangle className="size-5" />}
        {type === "error" && <IconAlertOctagon className="size-5" />}
        {type === "loading" && <IconLoader className="size-5 animate-spin" />}
      </div>

      <div className="flex flex-1 items-center">
        <div className="w-full">
          <p className="text-sm font-medium">{title}</p>
          {description && <p className="mt-1 text-sm opacity-90">{description}</p>}
        </div>
      </div>
      {button && (
        <div className="ml-4 shrink-0 rounded-md text-sm font-medium focus:outline-none">
          <button
            className={cn(
              "rounded px-3 py-1 text-sm font-semibold transition-colors",
              "bg-primary text-primary-foreground hover:bg-primary/90",
            )}
            onClick={() => {
              button.onClick();
              sonnerToast.dismiss(id);
            }}
          >
            {button.label}
          </button>
        </div>
      )}
    </div>
  );
}

const customToast = (
  message: string,
  data?: Omit<ToastProps, "id" | "title" | "type">,
  type: ToastType = "default",
) => {
  return sonnerToast.custom((id) => (
    <Toast
      id={id}
      title={message}
      type={type}
      description={data?.description}
      button={data?.button}
    />
  ));
};

export const toast = Object.assign(customToast, {
  success: (message: string, data?: Omit<ToastProps, "id" | "title" | "type">) =>
    customToast(message, data, "success"),
  info: (message: string, data?: Omit<ToastProps, "id" | "title" | "type">) =>
    customToast(message, data, "info"),
  warning: (message: string, data?: Omit<ToastProps, "id" | "title" | "type">) =>
    customToast(message, data, "warning"),
  error: (message: string, data?: Omit<ToastProps, "id" | "title" | "type">) =>
    customToast(message, data, "error"),
  loading: (message: string, data?: Omit<ToastProps, "id" | "title" | "type">) =>
    customToast(message, data, "loading"),
  dismiss: sonnerToast.dismiss,
});
