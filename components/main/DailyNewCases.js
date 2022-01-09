import React from "react";
import TimeSeriesBarChart from "../charts/TimeSeriesBarChart";

function DailyNewCases({ query }) {
  return (
    <div className="card">
      <div className="card-header">
        <p className="text-xl font-poppins font-bold">Daily New Cases</p>
      </div>
      <div className="card-body">
        <TimeSeriesBarChart
          query={query}
          color="#3990F3"
          timeDataName="date"
          valueDataName="new_cases"
          dateFormat="YYYY-MM-DD"
        />
      </div>
    </div>
  );
}

export default DailyNewCases;
