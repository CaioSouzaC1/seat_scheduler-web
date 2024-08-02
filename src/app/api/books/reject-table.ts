import { IApiRoot } from "@/interfaces/Api";
import api, { AuthInterceptor } from "@/services/api";

export async function rejectBook(id: string) {
  try {
    const response = await api.patch<IApiRoot>(`/books/${id}/reject`, {}, {
      headers: {
        ...(await AuthInterceptor()),
      },
    });

    return response.data;
  } catch (error) {
    throw new Error("Erro ao aceitar mesa");
  }
}
