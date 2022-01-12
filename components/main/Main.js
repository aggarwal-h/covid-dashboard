import React, { useEffect, useState } from "react";
import AllDataTable from "./AllDataTable";
import DailyNewCases from "./DailyNewCases";
import DailyNewDeaths from "./DailyNewDeaths";
import TotalCaseCount from "./TotalCaseCount";
import { useAllCountriesInfo, useDailyData } from "../../queries/queries";
import InlineSelect from "../select/InlineSelect";
import { useRouter } from "next/router";

function Main({ initialCountry }) {
  const router = useRouter();
  const country = initialCountry
    ? initialCountry
    : router.pathname === "/"
    ? "worldwide"
    : router.query.country;
  const dailyData = useDailyData(country);
  const countriesQuery = useAllCountriesInfo();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    if (mediaQueryList.matches) {
      setDark(true);
    }
    mediaQueryList.addEventListener("change", setDarkOnEvent);
    return () => {
      mediaQueryList.removeEventListener("change", setDarkOnEvent);
    };
  }, []);

  const setDarkOnEvent = (event) => {
    setDark(event.matches);
  };

  return (
    <div>
      <h1 className="font-poppins font-bold text-4xl text-gray-800 dark:text-white text-center md:text-left">
        <InlineSelect country={country} query={countriesQuery} /> Cases
      </h1>
      <TotalCaseCount country={country} dark={dark} />
      <h1 className="font-poppins font-bold text-4xl text-gray-800 dark:text-white text-center md:text-left">
        Timeseries Charts
      </h1>
      <DailyNewCases query={dailyData} dark={dark} />
      <DailyNewDeaths query={dailyData} dark={dark} />
      {router.pathname === "/" && (
        <div className="mt-16">
          <h1 className="font-poppins font-bold text-4xl text-gray-800 dark:text-white text-center md:text-left">
            Reported Cases Table
          </h1>
          <AllDataTable />
        </div>
      )}
    </div>
  );
}

export default Main;
