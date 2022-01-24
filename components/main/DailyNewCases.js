import React from "react";
import Card, { CardBody, CardHeader } from "../card/Card";
import TimeSeriesBarChart from "../charts/TimeSeriesBarChart";

function DailyNewCases({ dark, query, chartRef }) {
  return (
    <Card>
      <CardHeader>
        <p className="text-xl font-poppins font-bold dark:text-gray-100">
          Daily New Cases
        </p>
      </CardHeader>
      <CardBody>
        <TimeSeriesBarChart
          dark={dark}
          query={query}
          color="#3990F3"
          timeDataName="date"
          valueDataName="new_cases"
          dateFormat="YYYY-MM-DD"
          chartRef={chartRef}
        />
      </CardBody>
    </Card>
  );
}

export default DailyNewCases;
