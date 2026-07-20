import { useState } from "react";
import type { FormEvent } from "react";
import { LoadingButton } from "@/components/shared/LoadingButton";
import {
  AuthFormError,
  AuthFormFooter,
  AuthFormHeader,
} from "../components/AuthForm";
import {
  AuthInputField,
  AuthPasswordField,
} from "../components/AuthInputField";
import { AuthLayout } from "../components/AuthLayout";
import { useLoginMutation } from "../hooks/useLoginMutation";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      <AuthFormHeader
        eyebrow="Bem-vindo de volta"
        title="Entre na sua conta"
        description="Use seu email e senha para acessar suas inspirações."
      />

      <form className="space-y-5" onSubmit={handleSubmit}>
        <AuthInputField
          id="email"
          label="Email"
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
        />

        <AuthPasswordField
          id="password"
          label="Senha"
          hint="Mínimo 8 caracteres"
          name="password"
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
        />

        {loginMutation.isError && (
          <AuthFormError>{loginMutation.error.message}</AuthFormError>
        )}

        <LoadingButton
          type="submit"
          size="lg"
          isLoading={loginMutation.isPending}
          loadingLabel="Entrando..."
          className="mt-2 h-12 w-full bg-red-600 text-base text-white shadow-lg shadow-red-950/30 hover:bg-red-700"
        >
          Entrar
        </LoadingButton>
      </form>

      <p className="mt-7 text-center text-xs leading-5 text-zinc-500">
        Ao entrar, você concorda em manter seus dados de acesso seguros.
      </p>
      <AuthFormFooter
        prompt="Ainda não tem uma conta?"
        linkLabel="Cadastre-se"
        to="/signup"
        className="mt-4"
      />
    </AuthLayout>
  );
}
