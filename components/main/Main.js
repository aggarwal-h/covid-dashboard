import React from "react";
import AllDataTable from "./AllDataTable";
import DailyNewCases from "./DailyNewCases";
import DailyNewDeaths from "./DailyNewDeaths";
import TotalCaseCount from "./TotalCaseCount";
import { useAllCountriesInfo, useDailyData } from "../../queries/queries";
import InlineSelect from "../select/InlineSelect";
import { useRouter } from "next/router";

function Main() {
  const router = useRouter();
  const country = router.query.country;
  const dailyData = useDailyData();
  const countriesQuery = useAllCountriesInfo();
  return (
    <div>
      <h1 className="font-poppins font-bold text-4xl text-gray-800 text-center md:text-left">
        <InlineSelect query={countriesQuery} /> Cases
      </h1>
      <TotalCaseCount country={country} />
      <h1 className="font-poppins font-bold text-4xl text-gray-800 text-center md:text-left">
        Timeseries Charts
      </h1>
      <DailyNewCases query={dailyData} />
      <DailyNewDeaths query={dailyData} />
      {!country && (
        <React.Fragment>
          <h1 className="font-poppins font-bold text-4xl text-gray-800 text-center md:text-left">
            Reported Cases Table
          </h1>
          <AllDataTable />
        </React.Fragment>
      )}
    </div>
  );
}

export default Main;
