import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { inviteUser } from "../services/inviteService";

export const useSendInvite = () => {
  return useMutation({
    mutationFn: inviteUser,
    retry: false,
    onSuccess: () => {
      toast.success("Invite sent successfully!");
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error ? error.message : "Failed to send invite";
      toast.error(message);
    },
  });
};
