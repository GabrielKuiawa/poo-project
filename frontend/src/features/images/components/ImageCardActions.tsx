import { ChevronDown, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ImageCardActions() {
  return (
    <div className="absolute inset-0 opacity-0 transition-opacity duration-200 group-focus-within:opacity-100 group-hover:opacity-100">
      <Button
        className="absolute top-3 left-3 z-20 px-2 text-white hover:bg-white/15 hover:text-white"
        type="button"
        variant="ghost"
      >
        Perfil
        <ChevronDown strokeWidth={2.5} aria-hidden="true" />
      </Button>

      <Button
        className="absolute top-3 right-3 z-20"
        type="button"
        variant="destructive"
      >
        Salvar
      </Button>

      <Button
        className="absolute right-3 bottom-3 z-20 bg-white text-black hover:bg-zinc-200"
        type="button"
        variant="secondary"
        size="icon"
        aria-label="Compartilhar imagem"
      >
        <Upload strokeWidth={2.5} aria-hidden="true" />
      </Button>
    </div>
  );
}
