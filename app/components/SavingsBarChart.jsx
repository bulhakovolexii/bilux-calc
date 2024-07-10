import { useTheme } from "@emotion/react";
import { BarChart } from "@mui/x-charts/BarChart";

const chartSetting = {
  xAxis: [
    {
      label: "Енергоспоживання (кВт)",
      barGapRatio: 0,
    },
  ],

  height: 600,
};

const valueFormatter = (value) => `${value}, кВт·год`;

export default function SavingsBarChart({ data }) {
  const palette = useTheme().palette;

  const calculateDifferenceInPercentage = (index) => {
    const item = data[index];
    return ((1 - item.systemB / item.systemA) * 100).toFixed();
  };

  return (
    <BarChart
      dataset={data.map((item) => ({
        ...item,
        offset: Math.min(item.systemA, item.systemB),
        saving: item.systemA - item.systemB,
      }))}
      yAxis={[{ scaleType: "band", dataKey: "month" }]}
      series={[
        {
          dataKey: "systemB",
          label: "BILUX",
          color: palette.secondary.main,
          valueFormatter,
        },
        {
          dataKey: "offset",

          stack: "difference",
          color: "transparent",
          valueFormatter: () => null,
        },
        {
          dataKey: "saving",
          id: "saving",
          stack: "difference",
          color: palette.info.main,
          label: "Потенційна економія",
          valueFormatter,
        },
        {
          dataKey: "systemA",
          label: "Користувацька система",
          color: palette.primary.main,
          valueFormatter,
        },
      ]}
      layout="horizontal"
      tooltipLabelFormatter={(value, { dataKey }) => {
        return dataKey !== "offset" ? value : null;
      }}
      barLabel={(item, { bar }) => {
        if (item.seriesId === "saving" && item.value !== 0 && bar.width > 36) {
          return `${calculateDifferenceInPercentage(item.dataIndex)} %`;
        }
        return null;
      }}
      {...chartSetting}
    />
  );
}
