import api, { AuthInterceptor } from "@/services/api";
import { IApiRoot } from "@/interfaces/Api";
import { StoreMenuItemSchema } from "@/interfaces/MenuItem";

export async function storeNewMenuItem(
  data: StoreMenuItemSchema
): Promise<IApiRoot> {
  try {
    const response = await api.post<IApiRoot>(`/menu-items`, data, {
      headers: {
        ...(await AuthInterceptor()),
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao criar item");
  }
}
