import api, { AuthInterceptor } from "@/services/api";
import { IUpdateCompany } from "@/interfaces/Companies";

export async function updateCompany(data: IUpdateCompany): Promise<any> {
  try {
    const formData = new FormData();

    console.log(data);

    Object.keys(data).forEach((key) => {
      if (key === "image" && data[key] != null) {
        formData.append("images[]", data[key]);
      } else {
        formData.append(key, (data as Record<string, any>)[key]);
      }
    });

    console.log(formData);

    const response = await api.put<any>(`/companies/${data.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...(await AuthInterceptor()),
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao editar empresa");
  }
}
