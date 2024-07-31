import api, { AuthInterceptor } from "@/services/api";
import { IApiRoot } from "@/interfaces/Api";
import { ICreateTable } from "@/interfaces/Tables";

export async function storeNewTable(data: ICreateTable): Promise<IApiRoot> {
  try {
    const response = await api.post<IApiRoot>(`/tables`, data, {
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
