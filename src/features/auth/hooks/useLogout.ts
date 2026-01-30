import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";
import { authService } from "../../../api/services/auth.service";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      logout();
      queryClient.clear();
      navigate('/login');
    },
    onError: () => {
      logout();
      queryClient.clear();
      navigate('/login');
    },
  });
}