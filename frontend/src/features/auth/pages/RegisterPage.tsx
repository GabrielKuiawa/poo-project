import { Check, ImagePlus } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { FormField } from "@/components/shared/FormField";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useImageFileInput } from "@/hooks/useImageFileInput";
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

  const registerMutation = useRegisterMutation();
  const profileImageInput = useImageFileInput({
    onSelectionChange: registerMutation.reset,
    requiredMessage: "Escolha uma foto de perfil.",
  });

  const clearErrors = () => {
    registerMutation.reset();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const profileImage = profileImageInput.getRequiredFile();

    if (!profileImage) {
      return;
    }

    registerMutation.mutate({
      name,
      email,
      password,
      image: profileImage,
    });
  };

  const errorMessage =
    profileImageInput.error ?? registerMutation.error?.message ?? null;

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

        <FormField
          htmlFor="profile-image"
          label="Foto de perfil"
          hint="JPEG, PNG ou WebP · até 10 MB"
        >
          <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-3">
            <Avatar className="size-14 border-2 border-white shadow-sm">
              {profileImageInput.previewUrl && (
                <AvatarImage
                  src={profileImageInput.previewUrl}
                  alt="Prévia da foto de perfil"
                />
              )}
              <AvatarFallback className="bg-blue-100 text-blue-700">
                <ImagePlus size={20} aria-hidden="true" />
              </AvatarFallback>
            </Avatar>
            <Input
              id="profile-image"
              name="image"
              type="file"
              accept={profileImageInput.accept}
              onChange={profileImageInput.onChange}
              disabled={registerMutation.isPending}
              aria-invalid={Boolean(profileImageInput.error)}
              aria-required="true"
              className="h-auto rounded-lg bg-white px-3 py-2 text-sm file:mr-3 file:border-0 file:bg-transparent file:text-sm file:font-semibold file:text-blue-700"
            />
          </div>
        </FormField>

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
