import { Check } from "lucide-react";
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
import { useRegisterMutation } from "../hooks/useRegisterMutation";

const benefits = [
  "Organize referências em um só lugar",
  "Encontre inspiração quando precisar",
  "Continue seus projetos de onde parou",
];

export function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");

  const registerMutation = useRegisterMutation();

  const clearErrors = () => {
    registerMutation.reset();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    registerMutation.mutate({
      name,
      email,
      password,
      pathImageUser: profileImageUrl,
    });
  };

  const errorMessage = registerMutation.error?.message;

  return (
    <AuthLayout
      panelClassName="max-w-lg"
      hero={
        <div className="max-w-lg">
          <p className="mb-5 text-sm font-semibold tracking-widest text-red-300 uppercase">
            Comece sua coleção
          </p>
          <h1 className="m-0 text-5xl leading-none font-bold tracking-tighter xl:text-6xl">
            Ideias incríveis merecem um lugar especial.
          </h1>
          <ul className="mt-8 space-y-4 text-sm text-white/70">
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
      }
      footer={
        <p className="text-sm">
          Seu próximo projeto pode começar com uma única referência.
        </p>
      }
    >
      <AuthFormHeader
        eyebrow="Junte-se ao mood board"
        title="Crie sua conta"
        description="É rápido, gratuito e suas inspirações ficam sempre por perto."
      />

      <form className="space-y-4" onSubmit={handleSubmit}>
        <AuthInputField
          id="name"
          label="Nome"
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
        />

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
            clearErrors();
          }}
          disabled={registerMutation.isPending}
          aria-invalid={Boolean(errorMessage)}
          required
        />

        <AuthInputField
          id="profile-image-url"
          label="URL da foto de perfil"
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
        />

        <AuthPasswordField
          id="password"
          label="Senha"
          hint="Mínimo 8 caracteres"
          name="password"
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
        />

        {errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}

        <LoadingButton
          type="submit"
          size="lg"
          isLoading={registerMutation.isPending}
          loadingLabel="Criando sua conta..."
          className="mt-2 h-12 w-full bg-red-600 text-base text-white shadow-lg shadow-red-950/30 hover:bg-red-700"
        >
          Criar conta
        </LoadingButton>
      </form>

      <AuthFormFooter
        prompt="Já tem uma conta?"
        linkLabel="Entre agora"
        to="/login"
      />
    </AuthLayout>
  );
}
