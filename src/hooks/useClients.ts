import { useQuery } from "@tanstack/react-query";
import { fetchClients } from "../services/clientService";
import { GetClientsResponse } from "../types/client";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
export const useClients = (page: number = 1) => {
  const search = useSelector((state: RootState) => state.client.search);
  return useQuery<GetClientsResponse, Error>({
    queryKey: ["clients", page, search],
    queryFn: () => fetchClients(page, search),
  });
};
