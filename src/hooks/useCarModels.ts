import { useQuery } from "@tanstack/react-query";
import { fetchCarModels } from "../services/globalServices";
import { CarModel } from "../types";

export const useCarModels = (
  brandId?: number | string | null,
  query: string = ""
) => {
  return useQuery<CarModel[]>({
    queryKey: ["car-models", brandId, query],
    queryFn: () => fetchCarModels(brandId, query),
    enabled: !!brandId,
  });
};
