import { IQueryPaginateRoot } from "@/interfaces/Api";
import { IGetBooks } from "@/interfaces/Books";
import api, { AuthInterceptor } from "@/services/api";

export async function getBooks({
  limit = 20,
  page = 1,
}: IQueryPaginateRoot) {
  try {
    const response = await api.get<IGetBooks>(`/books`, {
      headers: {
        ...(await AuthInterceptor()),
      },
      params: {
        limit,
        page
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
