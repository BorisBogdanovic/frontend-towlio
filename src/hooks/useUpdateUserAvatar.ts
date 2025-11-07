import { useMutation } from "@tanstack/react-query";
import { updateUserAvatar } from "../services/userService";

import { UpdateUserAvatarResponse } from "../types/user";

export const useUpdateUserAvatar = () => {
  return useMutation<UpdateUserAvatarResponse, Error, File>({
    mutationFn: (file: File) => updateUserAvatar(file),
  });
};
