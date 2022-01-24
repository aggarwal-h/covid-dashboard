import React, { useEffect, useRef, useState } from "react";
import DailyNewCases from "./DailyNewCases";
import DailyNewDeaths from "./DailyNewDeaths";
import TotalCaseCount from "./TotalCaseCount";
import { useAllCountriesInfo, useDailyData } from "../../queries/queries";
import InlineSelect from "../select/InlineSelect";
import BoldTitle from "../title/BoldTitle";
import dynamic from "next/dynamic";
import useInView from "react-cool-inview";
import * as echarts from "echarts";

const AllDataTable = dynamic(() => import("./AllDataTable"));

function Main({ initialCountry: country }) {
  const dailyData = useDailyData(country);
  const countriesQuery = useAllCountriesInfo();
  const [dark, setDark] = useState(false);
  const newCasesChartRef = useRef(null);
  const newDeathsChartRef = useRef(null);

  if (newCasesChartRef.current && newDeathsChartRef.current) {
    newCasesChartRef.current.getEchartsInstance().group = "daily_charts";
    newDeathsChartRef.current.getEchartsInstance().group = "daily_charts";
    echarts.connect("daily_charts");
  }

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
      <DailyNewCases
        query={dailyData}
        dark={dark}
        chartRef={newCasesChartRef}
      />
      <span ref={observe} />
      <DailyNewDeaths
        query={dailyData}
        dark={dark}
        chartRef={newDeathsChartRef}
      />
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
