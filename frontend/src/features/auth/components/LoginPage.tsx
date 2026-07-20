import { Link } from "@tanstack/react-router";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { AuthLayout } from "@/app/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "../hooks/useLoginMutation";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useLoginMutation();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginMutation.mutate({ email: email.trim(), password });
  };

  return (
    <AuthLayout
      gridClassName="lg:grid-cols-[1.05fr_0.95fr]"
      panelClassName="max-w-md"
      hero={
        <div className="max-w-xl pb-10">
          <p className="mb-5 text-sm font-semibold tracking-[0.24em] text-red-300 uppercase">
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
      }
      footer={
        <p className="text-sm text-zinc-500">
          Descubra, salve e transforme referências em projetos.
        </p>
      }
    >
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold text-red-300">
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
            className="h-12 border-white/15 bg-white/10 text-base text-white placeholder:text-zinc-500 focus-visible:border-red-300 focus-visible:ring-red-300/25"
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
              className="h-12 border-white/15 bg-white/10 pr-12 text-base text-white placeholder:text-zinc-500 focus-visible:border-red-300 focus-visible:ring-red-300/25"
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-zinc-400 transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
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
          className="mt-2 h-12 w-full bg-red-600 text-base text-white shadow-lg shadow-red-950/30 hover:bg-red-700"
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
      <p className="mt-4 text-center text-sm text-zinc-400">
        Ainda não tem uma conta?{" "}
        <Link
          to="/signup"
          className="font-semibold text-red-300 transition-colors hover:text-red-200 hover:underline"
        >
          Cadastre-se
        </Link>
      </p>
    </AuthLayout>
  );
}
