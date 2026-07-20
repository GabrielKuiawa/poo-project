import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { ComponentProps, ReactNode } from "react";
import { FormField } from "@/components/shared/FormField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const authInputClassName =
  "h-12 border-white/15 bg-white/10 text-base text-white placeholder:text-zinc-500 focus-visible:border-red-300 focus-visible:ring-red-300/25";

type AuthInputFieldProps = Omit<ComponentProps<typeof Input>, "id"> & {
  id: string;
  label: ReactNode;
  hint?: ReactNode;
};

export function AuthInputField({
  className,
  hint,
  id,
  label,
  ...props
}: AuthInputFieldProps) {
  return (
    <FormField htmlFor={id} label={label} hint={hint}>
      <Input id={id} className={cn(authInputClassName, className)} {...props} />
    </FormField>
  );
}

type AuthPasswordFieldProps = Omit<AuthInputFieldProps, "type">;

export function AuthPasswordField({
  className,
  hint,
  id,
  label,
  ...props
}: AuthPasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <FormField htmlFor={id} label={label} hint={hint}>
      <div className="relative">
        <Input
          {...props}
          id={id}
          type={isVisible ? "text" : "password"}
          className={cn(authInputClassName, "pr-12", className)}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setIsVisible((visible) => !visible)}
          className="absolute top-1/2 right-1.5 -translate-y-1/2 text-zinc-400 hover:bg-transparent hover:text-white"
          aria-label={isVisible ? "Ocultar senha" : "Mostrar senha"}
          aria-pressed={isVisible}
        >
          {isVisible ? (
            <EyeOff aria-hidden="true" />
          ) : (
            <Eye aria-hidden="true" />
          )}
        </Button>
      </div>
    </FormField>
  );
}
