import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { fetchUsers } from "../services/userService";
import { RootState } from "../app/store";

export const useUsers = () => {
  const { page, city, status, search } = useSelector(
    (state: RootState) => state.user
  );

  return useQuery({
    queryKey: ["users", { page, city, status, search }],
    queryFn: () => fetchUsers({ page, city, status, search }),
  });
};
