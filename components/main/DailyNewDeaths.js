import Card, { CardBody, CardHeader } from "../card/Card";
import TimeSeriesBarChart from "../charts/TimeSeriesBarChart";

function DailyNewDeaths({ dark, query }) {
  return (
    <Card>
      <CardHeader>
        <p className="text-xl font-poppins font-bold dark:text-gray-100">
          Daily New Deaths
        </p>
      </CardHeader>
      <CardBody>
        <TimeSeriesBarChart
          dark={dark}
          query={query}
          color="#FF7A68"
          timeDataName="date"
          valueDataName="new_deaths"
          dateFormat="YYYY-MM-DD"
        />
      </CardBody>
    </Card>
  );
}

export default DailyNewDeaths;
