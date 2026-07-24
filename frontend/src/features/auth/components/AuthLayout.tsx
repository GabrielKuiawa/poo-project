import type { ReactNode } from "react";
import { Brand } from "@/components/shared/Brand";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type AuthLayoutProps = {
  children: ReactNode;
  hero: ReactNode;
  footer: ReactNode;
  panelClassName?: string;
};

export function AuthLayout({
  children,
  hero,
  footer,
  panelClassName,
}: AuthLayoutProps) {
  return (
    <main className="min-h-dvh bg-slate-50 text-zinc-950">
      <div className="grid min-h-dvh lg:grid-cols-2">
        <section className="relative hidden overflow-hidden bg-blue-700 p-10 text-white lg:flex lg:flex-col xl:p-14">
          <img
            src={`${import.meta.env.BASE_URL}art-hero-v2.webp`}
            alt=""
            width="1122"
            height="1402"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-950/60" />
          <div className="absolute top-0 right-0 size-32 bg-red-600/90" />

          <div className="relative flex h-full flex-col">
            <Brand
              className="gap-3 text-xl"
              labelClassName="text-white"
              logoClassName="size-12"
            />

            <div className="mt-auto max-w-xl border-l-4 border-red-600 bg-zinc-950/80 p-8 backdrop-blur-md xl:p-10">
              {hero}
            </div>

            <div className="mt-8 text-white/60">{footer}</div>
          </div>
        </section>

        <section className="flex min-h-dvh flex-col bg-white">
          <div className="relative h-40 shrink-0 overflow-hidden bg-blue-700 lg:hidden">
            <img
              src={`${import.meta.env.BASE_URL}art-hero-v2.webp`}
              alt=""
              width="1122"
              height="1402"
              className="size-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-blue-950/25" />
            <Brand
              className="absolute top-5 left-4 rounded-full bg-white px-3 py-2 text-sm shadow-md sm:left-8"
              logoClassName="size-8"
            />
          </div>

          <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-10 sm:py-12 lg:px-12">
            <Card
              className={cn(
                "w-full overflow-visible rounded-none border-0 bg-transparent p-0 text-zinc-950 shadow-none",
                panelClassName,
              )}
            >
              {children}
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}
