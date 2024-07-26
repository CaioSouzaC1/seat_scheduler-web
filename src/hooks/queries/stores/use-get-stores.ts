import { getStores } from "@/app/api/stores/get-store";
import { IGetStores } from "@/interfaces/Store";
import { useQuery } from "@tanstack/react-query";

export const useGetStores = () => {
  const { data: stores, isLoading: isLoadingCompanies } =
    useQuery<IGetStores>({
      queryKey: ["get-stores"],
      queryFn: () => getStores(),
    });

  return { stores, isLoadingCompanies };
};
