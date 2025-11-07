import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { updateUser as updateUserAction } from "../features/Auth/authSlice";
import { updateUser as updateUserService } from "../services/userService";
import { UpdateUserResponse } from "../types/user";

export const useEditUser = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation<
    UpdateUserResponse,
    Error,
    Parameters<typeof updateUserService>[0]
  >({
    mutationFn: (data) => updateUserService(data),
    onSuccess: (data) => {
      if (data && data.data) {
        dispatch(updateUserAction(data.data));
        toast.success("Profile updated successfully!");
      }
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Failed to update user", error.message);
    },
  });
};
