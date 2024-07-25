import { getCompanies } from "@/app/api/companies/get-companies";
import { IGetCompanies } from "@/interfaces/Companies";
import { useQuery } from "@tanstack/react-query";

export const useGetCompanies = () => {
  const { data: companies, isLoading: isLoadingCompanies } =
    useQuery<IGetCompanies>({
      queryKey: ["get-companies"],
      queryFn: () => getCompanies(),
    });

  return { companies, isLoadingCompanies };
};
