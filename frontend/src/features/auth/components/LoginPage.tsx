import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Images, LoaderCircle } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "../api/login";
import { saveAuthToken } from "../authStorage";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async ({ token }) => {
      saveAuthToken(token);
      await navigate({ to: "/" });
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginMutation.mutate({ email: email.trim(), password });
  };

  return (
    <main className="relative min-h-dvh overflow-hidden bg-zinc-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(147,51,234,0.28),transparent_34%),radial-gradient(circle_at_85%_80%,rgba(219,39,119,0.2),transparent_30%)]" />
      <div className="absolute top-[-8rem] right-[-5rem] size-80 rounded-full bg-fuchsia-500/15 blur-3xl" />
      <div className="absolute bottom-[-10rem] left-[-7rem] size-96 rounded-full bg-violet-600/20 blur-3xl" />

      <div className="relative mx-auto grid min-h-dvh max-w-7xl lg:grid-cols-[1.05fr_0.95fr]">
        <section className="hidden flex-col justify-between p-12 lg:flex xl:p-16">
          <Link
            to="/"
            className="inline-flex w-fit items-center gap-3 text-xl font-bold tracking-tight"
          >
            <span className="flex size-11 items-center justify-center rounded-2xl bg-white text-zinc-950">
              <Images size={22} />
            </span>
            mood board
          </Link>

          <div className="max-w-xl pb-10">
            <p className="mb-5 text-sm font-semibold tracking-[0.24em] text-fuchsia-300 uppercase">
              Seu espaço criativo
            </p>
            <h1 className="m-0 max-w-xl text-5xl leading-[1.05] font-bold tracking-[-0.04em] xl:text-6xl">
              Suas melhores ideias, sempre por perto.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-zinc-300">
              Entre para organizar referências, guardar inspirações e continuar
              criando de onde parou.
            </p>
          </div>

          <p className="text-sm text-zinc-500">
            Descubra, salve e transforme referências em projetos.
          </p>
        </section>

        <section className="flex items-center justify-center px-5 py-10 sm:px-10 lg:py-12">
          <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-9">
            <Link
              to="/"
              className="mb-10 inline-flex items-center gap-2.5 text-lg font-bold lg:hidden"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-white text-zinc-950">
                <Images size={20} />
              </span>
              mood board
            </Link>

            <div className="mb-8">
              <p className="mb-2 text-sm font-semibold text-fuchsia-300">
                Bem-vindo de volta
              </p>
              <h2 className="m-0 text-3xl font-bold tracking-tight">
                Entre na sua conta
              </h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Use seu email e senha para acessar suas inspirações.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="email">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="voce@exemplo.com"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    loginMutation.reset();
                  }}
                  disabled={loginMutation.isPending}
                  aria-invalid={loginMutation.isError}
                  required
                  autoFocus
                  className="h-12 border-white/15 bg-white/10 text-base text-white placeholder:text-zinc-500 focus-visible:border-fuchsia-300 focus-visible:ring-fuchsia-300/25"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <label className="text-sm font-medium" htmlFor="password">
                    Senha
                  </label>
                  <span className="text-xs text-zinc-500">Mínimo 8 caracteres</span>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      loginMutation.reset();
                    }}
                    disabled={loginMutation.isPending}
                    aria-invalid={loginMutation.isError}
                    required
                    minLength={8}
                    className="h-12 border-white/15 bg-white/10 pr-12 text-base text-white placeholder:text-zinc-500 focus-visible:border-fuchsia-300 focus-visible:ring-fuchsia-300/25"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-zinc-400 transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-300"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              {loginMutation.isError && (
                <p
                  className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200"
                  role="alert"
                >
                  {loginMutation.error.message}
                </p>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={loginMutation.isPending}
                className="mt-2 h-12 w-full bg-white text-base text-zinc-950 hover:bg-zinc-200"
              >
                {loginMutation.isPending && (
                  <LoaderCircle className="animate-spin" aria-hidden="true" />
                )}
                {loginMutation.isPending ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            <p className="mt-7 text-center text-xs leading-5 text-zinc-500">
              Ao entrar, você concorda em manter seus dados de acesso seguros.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
