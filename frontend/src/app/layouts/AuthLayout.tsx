import type { ReactNode } from "react";
import { Brand } from "@/components/shared/Brand";
import { cn } from "@/lib/utils";

type AuthLayoutProps = {
  children: ReactNode;
  hero: ReactNode;
  footer: ReactNode;
  gridClassName?: string;
  panelClassName?: string;
};

export function AuthLayout({
  children,
  hero,
  footer,
  gridClassName,
  panelClassName,
}: AuthLayoutProps) {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-zinc-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(230,0,35,0.3),transparent_34%),radial-gradient(circle_at_85%_80%,rgba(153,27,27,0.22),transparent_30%)]" />
      <div className="absolute -top-32 -right-20 size-80 rounded-full bg-red-500/15 blur-3xl" />
      <div className="absolute -bottom-40 -left-28 size-96 rounded-full bg-rose-700/20 blur-3xl" />

      <div
        className={cn(
          "relative mx-auto grid min-h-dvh max-w-7xl lg:grid-cols-2",
          gridClassName,
        )}
      >
        <section className="hidden flex-col justify-between p-12 lg:flex xl:p-16">
          <Brand className="gap-3 text-xl" logoClassName="size-12" />
          {hero}
          {footer}
        </section>

        <section className="flex items-center justify-center px-5 py-8 sm:px-10 lg:py-12">
          <div
            className={cn(
              "w-full rounded-4xl border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-9",
              panelClassName,
            )}
          >
            <Brand className="mb-8 text-lg lg:hidden" logoClassName="size-11" />
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}
