import { getTables } from "@/app/api/tables/get-tables";
import { IGetTables, IGetTablesQuery } from "@/interfaces/Tables";
import { useQuery } from "@tanstack/react-query";

export const useGetTables = ({ storeId, limit, page }: IGetTablesQuery) => {
  const { data: tables, isLoading: isLoadingTables } = useQuery<IGetTables>({
    queryKey: ["get-tables", storeId, limit, page],
    queryFn: () => getTables({ storeId, limit, page }),
  });

  return { tables, isLoadingTables };
};
