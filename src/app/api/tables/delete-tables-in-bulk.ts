import api, { AuthInterceptor } from "@/services/api";
import { IApiRoot } from "@/interfaces/Api";

export async function deleteTablesInBulk({
  storeId,
  tables,
}: {
  storeId: string;
  tables: string[];
}) {
  try {
    const response = await api.delete<IApiRoot>(`/tables`, {
      data: {
        storeId,
        tables,
      },
      headers: {
        ...(await AuthInterceptor()),
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao deletar mesas");
  }
}
