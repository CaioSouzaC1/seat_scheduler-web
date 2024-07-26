import { ICreatedStore, ICreateStore } from "@/interfaces/Store";
import api, { AuthInterceptor } from "@/services/api";

export async function storeNewStore(data: ICreateStore): Promise<ICreatedStore> {
  try {

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === "image") {
        formData.append("images[]", data[key]);
      } else {
        formData.append(key, (data as Record<string, any>)[key]);
      }
    });

    const response = await api.post<ICreatedStore>("/stores", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...(await AuthInterceptor()),
      },
    });

    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error("Erro ao criar loja");
  }
}
