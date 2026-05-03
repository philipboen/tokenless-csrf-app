import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Header } from "@/routes/(auth)/-components/header";
import { SwitchButton } from "@/routes/(auth)/-components/switch-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerTitle: string;
  headerLabel: string;
  switchButtonLabel: string;
  switchButtonHref: string;
  switchButtonDescription: string;
}

export const CardWrapper = ({
  children,
  headerTitle,
  headerLabel,
  switchButtonLabel,
  switchButtonHref,
  switchButtonDescription,
}: CardWrapperProps) => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center sm:p-4">
      <Card className="w-full max-w-xl px-0 sm:px-4 ring-0 sm:ring-1 max-2xl:mx-auto shadow-none sm:shadow-md">
        <CardHeader>
          <Header title={headerTitle} label={headerLabel} />
        </CardHeader>

        <CardContent>{children}</CardContent>

        <SwitchButton
          label={switchButtonLabel}
          description={switchButtonDescription}
          href={switchButtonHref}
        />
      </Card>
    </div>
  );
};
