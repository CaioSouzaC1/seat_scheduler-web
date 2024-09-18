import api, { AuthInterceptor } from "@/services/api";
import { IApiRoot } from "@/interfaces/Api";

export async function deleteMenuItemsInBulk({
  storeId,
  menuItems,
}: {
  storeId: string;
  menuItems: string[];
}) {
  try {
    const response = await api.delete<IApiRoot>(`/menu-items/bulk`, {
      data: {
        storeId,
        menuItems,
      },
      headers: {
        ...(await AuthInterceptor()),
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao deletar items");
  }
}
