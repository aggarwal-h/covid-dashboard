import React from "react";
import DailyNewCasesChart from "../charts/DailyNewCasesChart";

function DailyNewCases() {
  return (
    <div className="card">
      <div className="card-header">
        <p className="text-xl font-poppins font-bold">Daily New Cases</p>
      </div>
      <div className="card-body">
        <DailyNewCasesChart />
      </div>
    </div>
  );
}

export default DailyNewCases;
