import { IApiRoot } from "@/interfaces/Api";
import api, { AuthInterceptor } from "@/services/api";

export async function deleteStore(id: string) {
  try {
    const response = await api.delete<IApiRoot>(`/stores/${id}`, {
      headers: {
        ...(await AuthInterceptor()),
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao deletar loja");
  }
}
