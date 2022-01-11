import React, { useEffect, useRef, useState } from "react";
import ReactECharts from "echarts-for-react";
import moment from "moment";
import * as echarts from "echarts";
import * as numeral from "numeral";

function TimeSeriesBarChart({
  dark,
  query,
  color,
  timeDataName,
  valueDataName,
  dateFormat,
}) {
  const chart = useRef(null);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    adjustWidth();
    window.addEventListener("resize", adjustWidth);

    return () => {
      window.removeEventListener("resize", adjustWidth);
    };
  }, []);

  const adjustWidth = () => {
    const width = window.innerWidth > 0 ? window.innerWidth : screen.width;
    setMobile(width < 500);
  };

  useEffect(() => {
    if (query.isLoading) {
      chart.current?.getEchartsInstance().showLoading("default", {
        text: "Loading...",
        color: color,
        textColor: dark ? "#fff" : "#000",
        maskColor: dark ? "#242731" : "rgba(255, 255, 255, 0.8)",
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

  echarts.registerTheme("dark", {
    textStyle: {
      color: "#fff",
    },
    categoryAxis: {
      axisLine: {
        lineStyle: {
          color: "#fff",
        },
      },
    },
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
      left: mobile ? 40 : 60,
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
      axisLabel: {
        formatter: function (value) {
          return mobile ? numeral(value).format("0.[0]a") : value;
        },
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
        theme={dark ? "dark" : ""}
      />
    </div>
  );
}

export default TimeSeriesBarChart;
