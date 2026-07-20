import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";

type FormFieldProps = {
  children: ReactNode;
  htmlFor: string;
  label: ReactNode;
  hint?: ReactNode;
};

export function FormField({ children, htmlFor, label, hint }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <Label htmlFor={htmlFor}>{label}</Label>
        {hint && <span className="text-xs text-zinc-500">{hint}</span>}
      </div>
      {children}
    </div>
  );
}
