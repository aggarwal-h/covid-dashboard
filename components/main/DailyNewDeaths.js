import React from "react";
import TimeSeriesBarChart from "../charts/TimeSeriesBarChart";

function DailyNewDeaths({ dark, query }) {
  return (
    <div className="card mb-16">
      <div className="card-header">
        <p className="text-xl font-poppins font-bold dark:text-gray-100">
          Daily New Deaths
        </p>
      </div>
      <div className="card-body">
        <TimeSeriesBarChart
          dark={dark}
          query={query}
          color="#FF7A68"
          timeDataName="date"
          valueDataName="new_deaths"
          dateFormat="YYYY-MM-DD"
        />
      </div>
    </div>
  );
}

export default DailyNewDeaths;
