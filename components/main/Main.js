import React, { useEffect, useState } from "react";
import AllDataTable from "./AllDataTable";
import DailyNewCases from "./DailyNewCases";
import DailyNewDeaths from "./DailyNewDeaths";
import TotalCaseCount from "./TotalCaseCount";
import { useAllCountriesInfo, useDailyData } from "../../queries/queries";
import InlineSelect from "../select/InlineSelect";
import { useRouter } from "next/router";
import { SkeletonTheme } from "react-loading-skeleton";

function Main() {
  const router = useRouter();
  const country = router.query.country;
  const dailyData = useDailyData(country);
  const countriesQuery = useAllCountriesInfo();
  const [dark, setDark] = useState("dark", false);

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDark(true);
    }
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        event.matches ? setDark(true) : setDark(false);
      });
    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", () => {});
    };
  }, []);

  return (
    <div>
      <SkeletonTheme
        baseColor={dark ? "#1f2128" : ""}
        highlightColor={dark ? "#242731" : ""}
      >
        <h1 className="font-poppins font-bold text-4xl text-gray-800 dark:text-white text-center md:text-left">
          <InlineSelect query={countriesQuery} /> Cases
        </h1>
        <TotalCaseCount country={country} dark={dark} />
        <h1 className="font-poppins font-bold text-4xl text-gray-800 dark:text-white text-center md:text-left">
          Timeseries Charts
        </h1>
        <DailyNewCases query={dailyData} dark={dark} />
        <DailyNewDeaths query={dailyData} dark={dark} />
        {!country && (
          <React.Fragment>
            <h1 className="font-poppins font-bold text-4xl text-gray-800 dark:text-white text-center md:text-left">
              Reported Cases Table
            </h1>
            <AllDataTable />
          </React.Fragment>
        )}
      </SkeletonTheme>
    </div>
  );
}

export default Main;
