import api, { AuthInterceptor } from "@/services/api";
import { IApiRoot } from "@/interfaces/Api";

export async function deleteCompany(id: string) {
  try {
    const response = await api.delete<IApiRoot>(`/companies/${id}`, {
      headers: {
        ...(await AuthInterceptor()),
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao deletar empresa");
  }
}
