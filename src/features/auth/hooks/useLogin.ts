import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../stores/auth.store";
import type { AuthInputSchemaType } from "../../../api/schemas/auth.schema";
import { authService } from "../../../api/services/auth.service";
import { useNavigate } from "react-router-dom";
import { queryKeys } from "../../../api/utils/queryKeys";

export function useLogin() {
    const queryClient = useQueryClient();
    const { login } = useAuthStore();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (data: AuthInputSchemaType) => {
            const loginResponses = await authService.login(data);
            return loginResponses;
        },
        onSuccess(loginResponses) {
            login(loginResponses.token,loginResponses)
            queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
            navigate('/');
        },
        onError() {
            useAuthStore.getState().setAccessToken(null);
        }
    })
}