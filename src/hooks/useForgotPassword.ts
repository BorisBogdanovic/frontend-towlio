import { useMutation } from "@tanstack/react-query";
import { sendResetLink } from "../services/authService";
import toast from "react-hot-toast";

export function useForgotPassword(onSuccessCallback?: () => void) {
  return useMutation({
    mutationFn: (email: string) => sendResetLink(email),
    onSuccess: () => {
      toast.success(
        "If your email exists in our system, you will receive a reset link shortly.",
        {
          duration: 5000,
        }
      );
      onSuccessCallback?.();
    },
    onError: (error: unknown) => {
      const err = error as Error;
      toast.error(err.message || "Something went wrong. Please try again.");
    },
  });
}
