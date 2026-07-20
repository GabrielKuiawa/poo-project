import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { Check, Eye, EyeOff, LoaderCircle, Sparkles } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "../api/login";
import { register } from "../api/register";
import { saveAuthToken } from "../authStorage";

const benefits = [
  "Organize referências em um só lugar",
  "Encontre inspiração quando precisar",
  "Continue seus projetos de onde parou",
];

export function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const registerMutation = useMutation({
    mutationFn: async () => {
      const normalizedEmail = email.trim();
      await register({
        name: name.trim(),
        email: normalizedEmail,
        password,
        pathImageUser: profileImageUrl.trim(),
      });
      return login({ email: normalizedEmail, password });
    },
    onSuccess: async ({ token }) => {
      saveAuthToken(token);
      await navigate({ to: "/" });
    },
  });

  const clearErrors = () => {
    registerMutation.reset();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    registerMutation.mutate();
  };

  const errorMessage = registerMutation.error?.message;

  return (
    <main className="relative min-h-dvh overflow-hidden bg-zinc-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(230,0,35,0.32),transparent_34%),radial-gradient(circle_at_88%_78%,rgba(153,27,27,0.22),transparent_30%)]" />
      <div className="absolute -top-32 -right-20 size-80 rounded-full bg-red-500/15 blur-3xl" />
      <div className="absolute -bottom-40 -left-28 size-96 rounded-full bg-rose-700/20 blur-3xl" />

      <div className="relative mx-auto grid min-h-dvh max-w-7xl lg:grid-cols-[0.9fr_1.1fr]">
        <section className="hidden flex-col justify-between p-12 lg:flex xl:p-16">
          <Link
            to="/"
            className="inline-flex w-fit items-center gap-3 text-xl font-bold tracking-tight"
          >
            <img
              src={`${import.meta.env.BASE_URL}favicon.svg`}
              alt=""
              className="size-12 shrink-0"
            />
            mood board
          </Link>

          <div className="max-w-lg py-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-300/20 bg-red-400/10 px-3.5 py-2 text-xs font-semibold text-red-200">
              <Sparkles size={15} aria-hidden="true" />
              Comece sua coleção
            </div>
            <h1 className="m-0 text-5xl leading-[1.04] font-bold tracking-[-0.04em] xl:text-6xl">
              Ideias incríveis merecem um lugar especial.
            </h1>
            <ul className="mt-8 space-y-4 text-sm text-zinc-300">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-red-300">
                    <Check size={14} strokeWidth={3} aria-hidden="true" />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-sm text-zinc-500">
            Seu próximo projeto pode começar com uma única referência.
          </p>
        </section>

        <section className="flex items-center justify-center px-5 py-8 sm:px-10 lg:py-12">
          <div className="w-full max-w-lg rounded-4xl border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-9">
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2.5 text-lg font-bold lg:hidden"
            >
              <img
                src={`${import.meta.env.BASE_URL}favicon.svg`}
                alt=""
                className="size-11 shrink-0"
              />
              mood board
            </Link>

            <div className="mb-7">
              <p className="mb-2 text-sm font-semibold text-red-300">
                Junte-se ao mood board
              </p>
              <h2 className="m-0 text-3xl font-bold tracking-tight">
                Crie sua conta
              </h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                É rápido, gratuito e suas inspirações ficam sempre por perto.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="name">
                  Nome
                </label>
                <Input
                  id="name"
                  name="name"
                  autoComplete="name"
                  placeholder="Como podemos chamar você?"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    clearErrors();
                  }}
                  disabled={registerMutation.isPending}
                  required
                  maxLength={100}
                  autoFocus
                  className="h-12 border-white/15 bg-white/10 text-base text-white placeholder:text-zinc-500 focus-visible:border-red-300 focus-visible:ring-red-300/25"
                />
              </div>

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
                    clearErrors();
                  }}
                  disabled={registerMutation.isPending}
                  aria-invalid={Boolean(errorMessage)}
                  required
                  className="h-12 border-white/15 bg-white/10 text-base text-white placeholder:text-zinc-500 focus-visible:border-red-300 focus-visible:ring-red-300/25"
                />
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-medium"
                  htmlFor="profile-image-url"
                >
                  URL da foto de perfil
                </label>
                <Input
                  id="profile-image-url"
                  name="pathImageUser"
                  type="url"
                  autoComplete="url"
                  placeholder="https://exemplo.com/sua-foto.jpg"
                  value={profileImageUrl}
                  onChange={(event) => {
                    setProfileImageUrl(event.target.value);
                    clearErrors();
                  }}
                  disabled={registerMutation.isPending}
                  aria-invalid={Boolean(errorMessage)}
                  required
                  maxLength={255}
                  className="h-12 border-white/15 bg-white/10 text-base text-white placeholder:text-zinc-500 focus-visible:border-red-300 focus-visible:ring-red-300/25"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <label className="text-sm font-medium" htmlFor="password">
                    Senha
                  </label>
                  <span className="text-xs text-zinc-500">
                    Mínimo 8 caracteres
                  </span>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Crie uma senha segura"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      clearErrors();
                    }}
                    disabled={registerMutation.isPending}
                    aria-invalid={Boolean(errorMessage)}
                    required
                    minLength={8}
                    maxLength={72}
                    className="h-12 border-white/15 bg-white/10 pr-11 text-base text-white placeholder:text-zinc-500 focus-visible:border-red-300 focus-visible:ring-red-300/25"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    className="absolute top-1/2 right-3.5 -translate-y-1/2 cursor-pointer text-zinc-400 transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
                    aria-label={
                      showPassword ? "Ocultar senha" : "Mostrar senha"
                    }
                    aria-pressed={showPassword}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {errorMessage && (
                <p
                  className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200"
                  role="alert"
                >
                  {errorMessage}
                </p>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={registerMutation.isPending}
                className="mt-2 h-12 w-full bg-red-600 text-base text-white shadow-lg shadow-red-950/30 hover:bg-red-700"
              >
                {registerMutation.isPending && (
                  <LoaderCircle className="animate-spin" aria-hidden="true" />
                )}
                {registerMutation.isPending
                  ? "Criando sua conta..."
                  : "Criar conta"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-zinc-400">
              Já tem uma conta?{" "}
              <Link
                to="/login"
                className="font-semibold text-red-300 transition-colors hover:text-red-200 hover:underline"
              >
                Entre agora
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
