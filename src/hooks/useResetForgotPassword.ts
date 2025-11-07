import { useMutation } from "@tanstack/react-query";
import { resetForgotPassword } from "../services/authService";
import { ResetPasswordPayload } from "../types/auth";

type ResetPasswordResponse = {
  message: string;
};

export function useResetForgotPassword() {
  return useMutation<ResetPasswordResponse, Error, ResetPasswordPayload>({
    mutationFn: (data) => resetForgotPassword(data),
  });
}
