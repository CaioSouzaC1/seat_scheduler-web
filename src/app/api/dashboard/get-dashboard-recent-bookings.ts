import { IGetDashboardRecentBookings } from "@/interfaces/Dashboard";
import api, { AuthInterceptor } from "@/services/api";

export async function getDashboardRecentBookings() {
  try {
    const response = await api.get<IGetDashboardRecentBookings>(
      "/dashboard/recent-bookings",
      {
        headers: {
          ...(await AuthInterceptor()),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
