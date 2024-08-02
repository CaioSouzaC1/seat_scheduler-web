import { IGetTables, IGetTablesQuery } from "@/interfaces/Tables";
import api, { AuthInterceptor } from "@/services/api";

export async function getTables({
  storeId,
  limit = 20,
  page = 1,
}: IGetTablesQuery) {
  try {
    const response = await api.get<IGetTables>(`/tables/${storeId}/all`, {
      headers: {
        ...(await AuthInterceptor()),
      },
      params: { limit, page, },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
