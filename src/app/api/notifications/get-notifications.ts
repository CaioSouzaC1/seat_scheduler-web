import { IGetNotifications } from "@/interfaces/Notifications";
import api, { AuthInterceptor } from "@/services/api";

export async function getNotifications() {
  try {
    const response = await api.get<IGetNotifications>("/notifications", {
      headers: {
        ...(await AuthInterceptor()),
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
