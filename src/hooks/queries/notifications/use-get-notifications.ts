import { getNotifications } from "@/app/api/notifications/get-notifications";
import { IGetNotifications } from "@/interfaces/Notifications";
import { useQuery } from "@tanstack/react-query";

export const useGetNotifications = () => {
  const { data: notifications, isLoading: isLoadingNotifications } =
    useQuery<IGetNotifications>({
      queryKey: ["get-notifications"],
      queryFn: () => getNotifications(),
    });

  return { notifications, isLoadingNotifications };
};
