import { useMutation } from "@tanstack/react-query";
import { deactivateUser } from "../services/userService";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export const useDeactivateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: number) => deactivateUser(userId),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to deactivate user");
      }
    },
  });
};
