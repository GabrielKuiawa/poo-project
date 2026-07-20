import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type BrandProps = {
  className?: string;
  labelClassName?: string;
  logoClassName?: string;
};

export function Brand({
  className,
  labelClassName,
  logoClassName,
}: BrandProps) {
  return (
    <Link
      to="/"
      className={cn(
        "inline-flex w-fit items-center gap-2.5 font-bold tracking-tight",
        className,
      )}
    >
      <img
        src={`${import.meta.env.BASE_URL}favicon.svg`}
        alt=""
        className={cn("size-10 shrink-0", logoClassName)}
      />
      <span className={labelClassName}>mood board</span>
    </Link>
  );
}
