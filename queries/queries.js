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

export function useDailyData(country) {
  return useQuery(
    `daily-${country}`,
    () => {
      return axios
        .get(`covid/${country}/timeseries/all`)
        .then((res) => res.data);
    },
    {
      refetchOnWindowFocus: false,
    }
  );
}

export function usePreviousDays(days, country) {
  return useQuery(
    `${days}-previous-days-${country?.toLowerCase()}`,
    () => {
      return axios
        .get(`covid/${country}/timeseries/previous?days=${days}`)
        .then((res) => res.data);
    },
    {
      refetchOnWindowFocus: false,
    }
  );
}

export function useCountriesToday() {
  return useQuery(
    `countries-today`,
    () => {
      return axios
        .get(`covid/country/timeseries/today`)
        .then((res) => res.data);
    },
    {
      refetchOnWindowFocus: false,
    }
  );
}

export function useAllCountriesInfo() {
  return useQuery(
    `all-countries-info`,
    () => {
      return axios.get(`country-info/all`).then((res) => res.data);
    },
    {
      refetchOnWindowFocus: false,
    }
  );
}

export function useCountryExists(country) {
  return useQuery(
    `${country}-exists`,
    () => {
      return axios
        .get(`country-info/exists/${country}`)
        .then((res) => res.data);
    },
    {
      refetchOnWindowFocus: false,
    }
  );
}
