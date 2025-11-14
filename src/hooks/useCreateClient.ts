import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createClient } from "../services/clientService";
import { Client } from "../types/client";

export const useCreateClient = () => {
  return useMutation({
    mutationFn: (data: Client) => createClient(data),

    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(`Failed to create client: ${error.message}`);
      } else {
        toast.error("Unexpected error occurred");
      }
    },

    onSuccess: () => {
      toast.success("Client created successfully!");
    },
  });
};
