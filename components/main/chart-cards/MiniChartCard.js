import React from "react";
import dynamic from "next/dynamic";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

function MiniChartCard({ title, info, options, series, type }) {
  return (
    <div className="w-full xl:w-1/3">
      <div className="rounded-3xl shadow-[0_8px_25px_rgba(0,0,0,7%)] mx-4 mt-8 dark:bg-dark-700">
        <div className="relative h-48">
          <div className="absolute top-0 right-0 left-0 bottom-0 z-10 rounded-3xl overflow-hidden">
            {options && series && type && (
              <Chart
                options={options}
                series={series}
                type={type}
                width="100%"
                height="100%"
              />
            )}
          </div>
          <div className="p-4">
            <p className="text-2xl font-poppins font-bold text-gray-700 dark:text-gray-100 z-20">
              {title || <Skeleton width="60%" />}
            </p>
            <div className="flex justify-end pt-20">
              <p className="text-4xl font-poppins font-bold text-black dark:text-white z-20">
                {info || <Skeleton width="200px" />}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiniChartCard;
