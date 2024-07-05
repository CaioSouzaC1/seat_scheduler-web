import { useState, useEffect } from "react";
import axios from "axios";
import { IUseViaCepReturn, IViaCepAddress } from "@/interfaces/ViaCep";

const useViaCep = (cep: string): IUseViaCepReturn => {
  const [data, setData] = useState<IViaCepAddress | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (cep.length !== 8) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<IViaCepAddress>(
          `https://viacep.com.br/ws/${cep}/json/`
        );
        setData(response.data);
      } catch (err) {
        setError("Erro ao buscar dados");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cep]);

  return { data, error, loading };
};

export default useViaCep;
