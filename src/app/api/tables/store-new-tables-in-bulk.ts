import api, { AuthInterceptor } from "@/services/api";
import { IApiRoot } from "@/interfaces/Api";
import { ICreateTablesInBulk } from "@/interfaces/Tables";

export async function storeNewTablesInBulk(
  data: ICreateTablesInBulk
): Promise<IApiRoot> {
  try {
    const response = await api.post<IApiRoot>(`/tables/bulk`, data, {
      headers: {
        ...(await AuthInterceptor()),
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao criar mesa");
  }
}
