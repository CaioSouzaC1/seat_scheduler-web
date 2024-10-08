import api, { AuthInterceptor } from "@/services/api";
import { IApiRoot } from "@/interfaces/Api";
import { IUpdateTable } from "@/interfaces/Tables";

export async function updateTable(data: IUpdateTable): Promise<IApiRoot> {
  try {
    const response = await api.put<IApiRoot>(`/tables/${data.id}`, data, {
      headers: {
        ...(await AuthInterceptor()),
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao editar mesa");
  }
}
