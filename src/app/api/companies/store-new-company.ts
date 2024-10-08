import api, { AuthInterceptor } from "@/services/api";
import { ICreateCompany, ICreatedCompany } from "@/interfaces/Companies";

export async function storeNewCompany(
  data: ICreateCompany
): Promise<ICreatedCompany> {
  try {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === "image") {
        formData.append("images[]", data[key]);
      } else {
        formData.append(key, (data as Record<string, any>)[key]);
      }
    });

    const response = await api.post<ICreatedCompany>("/companies", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...(await AuthInterceptor()),
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao criar empresa");
  }
}
