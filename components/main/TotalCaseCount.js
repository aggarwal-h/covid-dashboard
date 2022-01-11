import React from "react";
import { numberWithCommas } from "../../utils";
import { usePreviousDays } from "../../queries/queries";
import MiniChartCard from "./chart-cards/MiniChartCard";

const PREVIOUS_DAYS = 7;

function TotalCaseCount({ dark, country }) {
  const queryData = usePreviousDays(PREVIOUS_DAYS, country);

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.9,
        opacityFrom: dark ? 0.9 : 0.7,
        opacityTo: dark ? 0.4 : 0.9,
        stops: [0, 100],
        shade: dark ? "dark" : "light",
      },
    },
    xaxis: {
      categories: queryData.data?.cases.map((c) => c.date),
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      tickAmount: 3,
      floating: false,
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    grid: {
      show: false,
      padding: {
        top: 2,
        right: 0,
        bottom: 0,
        left: -10,
      },
    },
    stroke: {
      curve: "smooth",
    },
    tooltip: {
      enabled: false,
    },
  };

  return (
    <div className="flex flex-row flex-wrap mb-16 p-2">
      <MiniChartCard
        title="Cases"
        info={numberWithCommas(queryData.data?.total_cases)}
        options={options}
        series={[
          {
            name: "covid_total_cases",
            data:
              queryData.data?.cases.map((c) =>
                c.total_cases < 0 ? 0 : c.total_cases
              ) || [],
          },
        ]}
        type="area"
      />
      <MiniChartCard
        title="Deaths"
        info={numberWithCommas(queryData.data?.total_deaths)}
        options={{ ...options, colors: ["#FF7A68"] }}
        series={[
          {
            name: "covid_total_deaths",
            data:
              queryData.data?.cases.map((c) =>
                c.total_deaths < 0 ? 0 : c.total_deaths
              ) || [],
          },
        ]}
        type="area"
      />
      <MiniChartCard
        title="Recovered"
        info={queryData.isLoading ? null : numberWithCommas(0)}
        options={
          queryData.isLoading ? null : { ...options, colors: ["#3DBAA2"] }
        }
        series={
          queryData.isLoading
            ? null
            : [
                {
                  name: "covid_total_recovered",
                  data: [40, 60, 170, 110, 140, 110, 200],
                },
              ]
        }
        type="area"
      />
    </div>
  );
}

export default TotalCaseCount;
