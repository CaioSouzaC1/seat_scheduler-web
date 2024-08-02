import api, { AuthInterceptor } from "@/services/api";
import { IUpdateStore } from '@/interfaces/Store'
import { IApiRoot } from "@/interfaces/Api";

export async function updateStore(data: IUpdateStore): Promise<IApiRoot> {
  try {
    const formData = new FormData();


    Object.keys(data).forEach((key) => {
      if (key === "image" && data[key] != null) {
        formData.append("images[]", data[key]);
      } else {
        formData.append(key, (data as Record<string, any>)[key]);
      }
    });


    const response = await api.put<IApiRoot>(`/stores/${data.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...(await AuthInterceptor()),
      },
    });

    return response.data;
  } catch (error) {
    throw new Error("Erro ao editar loja");
  }
}
