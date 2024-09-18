import { getMenuItems } from "@/app/api/menu-items/get-menu-items";
import { IGetMenuItemProps, IGetMenuItems } from "@/interfaces/MenuItem";
import { useQuery } from "@tanstack/react-query";

export const useGetMenuItems = ({
  storeId,
  limit,
  page,
  search,
}: IGetMenuItemProps) => {
  const { data: menuItems, isLoading: isLoadingMenuItems } =
    useQuery<IGetMenuItems>({
      queryKey: ["get-menu-items", storeId, limit, page],
      queryFn: () => getMenuItems({ storeId, limit, page, search }),
    });

  return { menuItems, isLoadingMenuItems };
};
