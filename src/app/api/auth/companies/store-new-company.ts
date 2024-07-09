import { ICreateUser } from "@/interfaces/User";
import { ICreatedUser } from "@/interfaces/Auth";
import api from "@/services/api";

export async function storeNewCompany(
  data: ICreateUser
): Promise<ICreatedUser> {
  try {
    const response = await api.post<ICreatedUser>("/companies", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao criar usuário");
  }
}
