
import { getBooks } from "@/app/api/books/get-book";
import { IQueryPaginateRoot } from "@/interfaces/Api";
import { IGetBooks } from "@/interfaces/Books";
import { useQuery } from "@tanstack/react-query";

export const useGetBooks = ({ limit, page }: IQueryPaginateRoot) => {
  const { data: books, isLoading: isLoadingCompanies } =
    useQuery<IGetBooks>({
      queryKey: ["get-books", limit, page],
      queryFn: () => getBooks({ limit, page }),
    });

  return { books, isLoadingCompanies };
};
