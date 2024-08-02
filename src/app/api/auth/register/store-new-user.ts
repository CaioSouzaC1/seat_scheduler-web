import { ICreateUser } from "@/interfaces/User";
import { ICreatedUser } from "@/interfaces/Auth";
import api from "@/services/api";

export async function storeNewUser(data: ICreateUser): Promise<ICreatedUser> {
  try {
    const response = await api.post<ICreatedUser>("/users", data);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao criar usuário");
  }
}
