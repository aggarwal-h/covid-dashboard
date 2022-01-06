import axios from "axios";
import { useQuery } from "react-query";

export function useData() {
  return useQuery(
    "data",
    () => {
      return axios
        .get("https://covid19.mathdro.id/api")
        .then((res) => res.data);
    },
    {
      refetchOnWindowFocus: false,
    }
  );
}

export function useDailyData() {
  return useQuery(
    "daily",
    () => {
      return axios
        .get("http://localhost:3000/api/covid/worldwide/timeseries/all")
        .then((res) => res.data);
    },
    {
      refetchOnWindowFocus: false,
    }
  );
}
