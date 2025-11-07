import { useQuery } from "@tanstack/react-query";
import { fetchCarBrands } from "../services/globalServices";

export const useCarBrands = (query: string) => {
  return useQuery({
    queryKey: ["car-brands", query],
    queryFn: () => fetchCarBrands(query),
    enabled: true,
  });
};
