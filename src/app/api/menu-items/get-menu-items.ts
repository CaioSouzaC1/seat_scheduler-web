import { IQueryPaginateRoot } from "@/interfaces/Api";
import { IGetMenuItemProps, IGetMenuItems } from "@/interfaces/MenuItem";
import api, { AuthInterceptor } from "@/services/api";

export async function getMenuItems({
  storeId,
  limit,
  page,
  search,
}: IGetMenuItemProps) {
  try {
    const response = await api.get<IGetMenuItems>("/menu-items", {
      headers: {
        ...(await AuthInterceptor()),
      },
      params: {
        storeId,
        limit,
        page,
        search,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
