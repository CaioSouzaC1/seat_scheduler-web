import { getDashboardCards } from "@/app/api/dashboard/get-dashboard-cards";
import { IGetDashBoardCards } from "@/interfaces/Dashboard";
import { useQuery } from "@tanstack/react-query";

export const useGetDashboardCards = () => {
  const { data: dashboardCards, isLoading: isLoadingDashboardCards } =
    useQuery<IGetDashBoardCards>({
      queryKey: ["get-dashboard-cards"],
      queryFn: () => getDashboardCards(),
    });

  return { dashboardCards, isLoadingDashboardCards };
};
