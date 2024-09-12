import { IGetDashBoardCards } from "@/interfaces/Dashboard";
import api, { AuthInterceptor } from "@/services/api";

export async function getDashboardCards() {
  try {
    const response = await api.get<IGetDashBoardCards>("/dashboard/cards", {
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
