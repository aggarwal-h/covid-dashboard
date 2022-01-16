import React, { useEffect, useState } from "react";
import DailyNewCases from "./DailyNewCases";
import DailyNewDeaths from "./DailyNewDeaths";
import TotalCaseCount from "./TotalCaseCount";
import { useAllCountriesInfo, useDailyData } from "../../queries/queries";
import InlineSelect from "../select/InlineSelect";
import BoldTitle from "../title/BoldTitle";
import dynamic from "next/dynamic";
import useInView from "react-cool-inview";

const AllDataTable = dynamic(() => import("./AllDataTable"));

function Main({ initialCountry: country }) {
  const dailyData = useDailyData(country);
  const countriesQuery = useAllCountriesInfo();
  const [dark, setDark] = useState(false);

  const { observe, inView } = useInView({
    onEnter: ({ unobserve }) => unobserve(),
  });

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
      <BoldTitle>
        <InlineSelect country={country} query={countriesQuery} /> Cases
      </BoldTitle>
      <TotalCaseCount country={country} dark={dark} />
      <BoldTitle>Timeseries Charts</BoldTitle>
      <DailyNewCases query={dailyData} dark={dark} />
      <span ref={observe} />
      <DailyNewDeaths query={dailyData} dark={dark} />
      {country === "worldwide" && (
        <div className="mt-16">
          <BoldTitle>Reported Cases Table</BoldTitle>
          {inView && <AllDataTable />}
        </div>
      )}
    </div>
  );
}

export default Main;
