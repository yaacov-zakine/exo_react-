import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNumberAlea } from "../api/fetchApi";
import { usePrimeStore } from "../stores/usePrimeStore.js";

export const usePrimeAlea = () => {
  const setNumberFromApi = usePrimeStore((state) => state.setNumberFromApi);

  const query = useQuery({
    queryKey: ["prime-number"],
    queryFn: fetchNumberAlea,
    refetchOnWindowFocus: false,
    staleTime: 30 * 1000,
  });

  useEffect(() => {
    if (query.data?.number !== undefined) {
      setNumberFromApi(query.data.number);
    }
  }, [query.data?.number, setNumberFromApi]);

  return query;
};
