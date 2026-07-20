import { CircleAlert, LoaderCircle } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageFeedbackProps = {
  children: ReactNode;
  variant?: "loading" | "error";
  className?: string;
};

export function PageFeedback({
  children,
  variant = "loading",
  className,
}: PageFeedbackProps) {
  const Icon = variant === "loading" ? LoaderCircle : CircleAlert;

  return (
    <div
      role={variant === "loading" ? "status" : "alert"}
      className={cn(
        "mx-auto flex min-h-40 max-w-5xl items-center justify-center gap-2 p-6 text-sm text-muted-foreground",
        className,
      )}
    >
      <Icon
        className={cn("size-5", variant === "loading" && "animate-spin")}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
