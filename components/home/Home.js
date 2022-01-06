import React from "react";
import DailyNewCases from "./DailyNewCases";
import TotalCaseCount from "./TotalCaseCount";

function Home() {
  return (
    <div>
      <h1 className="font-poppins font-bold text-4xl text-gray-800">
        Worldwide Cases
      </h1>
      <TotalCaseCount />
      <DailyNewCases />
    </div>
  );
}

export default Home;
