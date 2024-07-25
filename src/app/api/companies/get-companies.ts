import { IGetCompanies } from "@/interfaces/Companies";
import api, { AuthInterceptor } from "@/services/api";

export async function getCompanies() {
  try {
    const response = await api.get<IGetCompanies>("/companies", {
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
