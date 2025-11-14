import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData } from "../services/dashboardService";

export const useDashboardData = () => {
  return useQuery({
    queryKey: ["dashboard-data"],
    queryFn: () => fetchDashboardData(),
  });
};
