import { getDashboardRecentBookings } from "@/app/api/dashboard/get-dashboard-recent-bookings";
import { IGetDashboardRecentBookings } from "@/interfaces/Dashboard";
import { useQuery } from "@tanstack/react-query";

export const useGetDashboardRecentBookings = () => {
  const { data: dashboardRecentBookings, isLoading: isLoadingRecentBookings } =
    useQuery<IGetDashboardRecentBookings>({
      queryKey: ["get-dashboard-recent-bookings"],
      queryFn: () => getDashboardRecentBookings(),
    });

  return { dashboardRecentBookings, isLoadingRecentBookings };
};
