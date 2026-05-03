import { IconLoader2 } from "@tabler/icons-react";

import type { ButtonProps } from "@/components/ui/button";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
}

export const LoadingButton = ({
  type,
  loading,
  disabled,
  className,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button
      type={type}
      disabled={loading || disabled}
      className={cn("flex cursor-pointer items-center gap-2 rounded-none", className)}
      {...props}
    >
      {props.children}
      {loading && <IconLoader2 className="size-5 animate-spin text-white" />}
    </Button>
  );
};
