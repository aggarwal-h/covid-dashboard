import React from "react";
import ReactECharts from "echarts-for-react";
import { useDailyData } from "../../queries/queries";
import moment from "moment";

function DailyNewCasesChart() {
  const dailyData = useDailyData();
  if (dailyData.isLoading) {
    return null;
  }
  const data = {
    categoryData: [],
    valueData: [],
  };
  for (let i = 0; i < dailyData.data.length; i++) {
    data.categoryData.push(moment(dailyData.data[i].date).format("YYYY-MM-DD"));
    data.valueData.push(dailyData.data[i].new_cases);
  }

  const option = {
    // title: {
    //   text: "Worldwide Data",
    //   left: 10,
    // },
    toolbox: {
      show: false,
      feature: {
        dataZoom: {
          yAxisIndex: false,
        },
        saveAsImage: {
          pixelRatio: 2,
        },
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      className: "text-white",
    },
    grid: {
      bottom: 30,
      right: 10,
      top: 10,
      left: 80,
    },
    dataZoom: [
      {
        type: "inside",
      },
      // {
      //   type: "slider",
      // },
    ],
    xAxis: {
      data: data.categoryData,
      silent: false,
      splitLine: {
        show: false,
      },
      splitArea: {
        show: false,
      },
    },
    yAxis: {
      splitArea: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
    color: ["#3990F3"],
    series: [
      {
        type: "bar",
        data: data.valueData,
      },
    ],
  };

  return (
    <div className="h-[350px]">
      <ReactECharts
        option={option}
        style={{
          height: "100%",
        }}
      />
    </div>
  );
}

export default DailyNewCasesChart;
