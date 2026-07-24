import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/authService";
import type { UpdateProfileData } from "../services/authService";
import { currentUserQueryKey } from "./useCurrentUserQuery";

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profile: UpdateProfileData) =>
      authService.updateProfile({
        ...profile,
        name: profile.name.trim(),
      }),
    onSuccess: ({ data }) => {
      queryClient.setQueryData(currentUserQueryKey, data);
    },
  });
}
