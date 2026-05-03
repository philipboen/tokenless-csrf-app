import type { ToasterProps } from "sonner";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      // Remove all styling, letting the headless implementations handle it entirely
      // This provides the cleanest slate for your custom wrapper
      toastOptions={{
        unstyled: true,
      }}
      {...props}
    />
  );
};

export { Toaster };
