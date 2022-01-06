import React from "react";
import dynamic from "next/dynamic";
import { numberWithCommas } from "../../utils";
import { useData } from "../../queries/queries";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

function TotalCaseCount() {
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.9,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
    xaxis: {
      categories: [
        "01 Jan",
        "02 Jan",
        "03 Jan",
        "04 Jan",
        "05 Jan",
        "06 Jan",
        "07 Jan",
      ],
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
        top: -10,
        right: -10,
        bottom: -20,
        left: -10,
      },
    },
    stroke: {
      curve: "smooth",
    },
    tooltip: {
      enabled: false,
    },
    // colors: ["#355DFF"],
  };

  const series = [
    {
      name: "Series 1",
      data: [10, 40, 30, 45, 30, 50, 60],
    },
  ];

  const query = useData();

  if (query.isLoading) {
    return <div></div>;
  }

  return (
    <div className="flex flex-wrap mb-16">
      <div className="relative w-full flex-[0_0_30%] max-w-[30%] rounded-3xl shadow-[0_8px_25px_rgba(0,0,0,7%)] mx-4 mt-8">
        <div className="relative h-48">
          <div className="absolute top-0 right-0 left-0 bottom-0 -z-10 rounded-3xl overflow-hidden">
            <Chart
              options={options}
              series={series}
              type="area"
              width="100%"
              height="100%"
            />
          </div>
          <div className="p-4">
            <p className="text-2xl font-poppins font-bold text-gray-700">
              Coronavirus cases
            </p>
            <div className="flex justify-end pt-20">
              <p className="text-4xl font-poppins font-bold text-black">
                {numberWithCommas(query.data.confirmed.value)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full flex-[0_0_30%] max-w-[30%] rounded-3xl shadow-[0_8px_25px_rgba(0,0,0,7%)] mx-4 mt-8">
        <div className="relative h-48">
          <div className="absolute top-0 right-0 left-0 bottom-0 -z-10 rounded-3xl overflow-hidden">
            <Chart
              options={{ ...options, colors: ["#FF7A68"] }}
              series={[{ ...series[0], data: [130, 60, 80, 110, 90, 140, 40] }]}
              type="area"
              width="100%"
              height="100%"
            />
          </div>
          <div className="p-4">
            <p className="text-2xl font-poppins font-bold text-gray-700">
              Deaths
            </p>
            <div className="flex justify-end pt-20">
              <p className="text-4xl font-poppins font-bold text-black">
                {numberWithCommas(query.data.deaths.value)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full flex-[0_0_30%] max-w-[30%] rounded-3xl shadow-[0_8px_25px_rgba(0,0,0,7%)] mx-4 mt-8">
        <div className="relative h-48">
          <div className="absolute top-0 right-0 left-0 bottom-0 -z-10 rounded-3xl overflow-hidden">
            <Chart
              options={{ ...options, colors: ["#3DBAA2"] }}
              series={[
                { ...series[0], data: [40, 60, 170, 110, 140, 110, 200] },
              ]}
              type="area"
              width="100%"
              height="100%"
            />
          </div>
          <div className="p-4">
            <p className="text-2xl font-poppins font-bold text-gray-700">
              Recovered
            </p>
            <div className="flex justify-end pt-20">
              <p className="text-4xl font-poppins font-bold text-black">
                {numberWithCommas(query.data.recovered.value)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TotalCaseCount;
