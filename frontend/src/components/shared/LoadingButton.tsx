import { LoaderCircle } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { Button } from "@/components/ui/button";

type LoadingButtonProps = ComponentProps<typeof Button> & {
  isLoading: boolean;
  loadingLabel: ReactNode;
};

export function LoadingButton({
  children,
  disabled,
  isLoading,
  loadingLabel,
  ...props
}: LoadingButtonProps) {
  return (
    <Button disabled={disabled || isLoading} {...props}>
      {isLoading && (
        <LoaderCircle className="animate-spin" aria-hidden="true" />
      )}
      {isLoading ? loadingLabel : children}
    </Button>
  );
}
