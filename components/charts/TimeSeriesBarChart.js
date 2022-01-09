import React, { useEffect, useRef } from "react";
import ReactECharts from "echarts-for-react";
import moment from "moment";

function TimeSeriesBarChart({
  query,
  color,
  timeDataName,
  valueDataName,
  dateFormat,
}) {
  const chart = useRef(null);
  useEffect(() => {
    if (query.isLoading) {
      chart.current?.getEchartsInstance().showLoading("default", {
        text: "Loading...",
        color: color,
        textColor: "#000",
        maskColor: "rgba(255, 255, 255, 0.8)",
        zlevel: 0,
        fontSize: 16,
        showSpinner: true,
        spinnerRadius: 14,
        lineWidth: 5,
        fontWeight: "normal",
        fontStyle: "normal",
        fontFamily: "sans-serif",
      });
    } else {
      chart.current?.getEchartsInstance().hideLoading();
    }
  });

  const data = {
    timeData: [],
    valueData: [],
  };

  if (!query.isLoading) {
    for (let i = 0; i < query.data.length; i++) {
      data.timeData.push(
        moment(query.data[i][timeDataName]).format(dateFormat)
      );
      data.valueData.push(query.data[i][valueDataName]);
    }
  }

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
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
    ],
    xAxis: {
      data: data.timeData,
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
    color: [color],
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
        ref={chart}
        option={option}
        style={{
          height: "100%",
        }}
      />
    </div>
  );
}

export default TimeSeriesBarChart;
