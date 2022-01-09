import React from "react";
import TimeSeriesBarChart from "../charts/TimeSeriesBarChart";

function DailyNewCases({ dark, query }) {
  return (
    <div className="card">
      <div className="card-header">
        <p className="text-xl font-poppins font-bold dark:text-gray-100">
          Daily New Cases
        </p>
      </div>
      <div className="card-body">
        <TimeSeriesBarChart
          dark={dark}
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
