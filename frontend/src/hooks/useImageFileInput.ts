import { useCallback, useEffect, useState } from "react";
import type { ChangeEvent } from "react";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const acceptedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

export const IMAGE_FILE_ACCEPT = [...acceptedImageTypes].join(",");

export function getImageValidationError(
  file: Pick<File, "size" | "type">,
): string | null {
  if (!acceptedImageTypes.has(file.type)) {
    return "Escolha uma imagem JPEG, PNG ou WebP.";
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return "A imagem não pode exceder 10 MB.";
  }

  return null;
}

type UseImageFileInputOptions = {
  onSelectionChange?: () => void;
  requiredMessage?: string;
};

export function useImageFileInput({
  onSelectionChange,
  requiredMessage = "Escolha uma imagem.",
}: UseImageFileInputOptions = {}) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl("");
      return;
    }

    const reader = new FileReader();

    reader.addEventListener("load", () => {
      setPreviewUrl(typeof reader.result === "string" ? reader.result : "");
    });
    reader.readAsDataURL(file);

    return () => {
      if (reader.readyState === FileReader.LOADING) {
        reader.abort();
      }
    };
  }, [file]);

  const selectFile = useCallback(
    (selectedFile: File | null) => {
      onSelectionChange?.();

      const validationError = selectedFile
        ? getImageValidationError(selectedFile)
        : null;

      setFile(validationError ? null : selectedFile);
      setError(validationError);

      return validationError === null;
    },
    [onSelectionChange],
  );

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.currentTarget.files?.[0] ?? null;

      if (!selectFile(selectedFile)) {
        event.currentTarget.value = "";
      }
    },
    [selectFile],
  );

  const getRequiredFile = useCallback(() => {
    if (file) {
      return file;
    }

    setError(requiredMessage);
    return null;
  }, [file, requiredMessage]);

  const reset = useCallback(() => {
    setFile(null);
    setPreviewUrl("");
    setError(null);
  }, []);

  return {
    accept: IMAGE_FILE_ACCEPT,
    error,
    file,
    getRequiredFile,
    onChange,
    previewUrl,
    reset,
    selectFile,
  };
}
