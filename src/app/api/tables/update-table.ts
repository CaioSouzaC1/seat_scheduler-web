import api, { AuthInterceptor } from "@/services/api";
import { IUpdateStore } from "@/interfaces/Store";
import { IApiRoot } from "@/interfaces/Api";

export async function updateTable(data: IUpdateStore): Promise<IApiRoot> {
  try {
    const response = await api.put<IApiRoot>(`/stores/${data.id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...(await AuthInterceptor()),
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao editar loja");
  }
}
