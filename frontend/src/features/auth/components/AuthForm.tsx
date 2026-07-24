import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

type AuthFormHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function AuthFormHeader({
  eyebrow,
  title,
  description,
}: AuthFormHeaderProps) {
  return (
    <div className="mb-8">
      <p className="mb-2 text-sm font-semibold text-red-600">{eyebrow}</p>
      <h2 className="m-0 text-3xl font-bold tracking-tight">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-zinc-600">{description}</p>
    </div>
  );
}

type AuthFormErrorProps = {
  children: ReactNode;
};

export function AuthFormError({ children }: AuthFormErrorProps) {
  return (
    <Alert className="border-red-200 bg-red-50 text-red-700">
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}

type AuthFormFooterProps = {
  prompt: string;
  linkLabel: string;
  to: "/login" | "/signup";
  className?: string;
};

export function AuthFormFooter({
  prompt,
  linkLabel,
  to,
  className = "mt-6",
}: AuthFormFooterProps) {
  return (
    <p className={cn("text-center text-sm text-zinc-600", className)}>
      {prompt}{" "}
      <Link
        to={to}
        className="font-semibold text-red-600 transition-colors hover:text-red-700 hover:underline"
      >
        {linkLabel}
      </Link>
    </p>
  );
}
