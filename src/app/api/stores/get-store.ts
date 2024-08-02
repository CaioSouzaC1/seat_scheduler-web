import { IGetStores } from "@/interfaces/Store";
import api, { AuthInterceptor } from "@/services/api";

export async function getStores() {
  try {
    const response = await api.get<IGetStores>("/stores", {
      headers: {
        ...(await AuthInterceptor()),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
