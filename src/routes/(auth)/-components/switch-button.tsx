import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

interface SwitchButtonProps {
  label: string;
  href: string;
  description?: string;
}

export const SwitchButton = ({ label, href, description }: SwitchButtonProps) => {
  return (
    <div className="flex items-baseline px-6">
      <p className="text-sm">{description}</p>
      <Button variant="link" className="px-2" asChild>
        <Link to={href}>{label}</Link>
      </Button>
    </div>
  );
};
