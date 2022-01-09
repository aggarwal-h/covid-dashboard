import React from "react";
import TimeSeriesBarChart from "../charts/TimeSeriesBarChart";

function DailyNewDeaths({ query }) {
  return (
    <div className="card mb-16">
      <div className="card-header">
        <p className="text-xl font-poppins font-bold">Daily New Deaths</p>
      </div>
      <div className="card-body">
        <TimeSeriesBarChart
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
