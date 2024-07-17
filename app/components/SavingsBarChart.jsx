import { useTheme } from "@emotion/react";
import { BarChart } from "@mui/x-charts/BarChart";

const valueFormatter = (value) =>
  `${value.toLocaleString("uk-UA", { useGrouping: true })}, кВт·год`;

export default function SavingsBarChart({ data }) {
  const palette = useTheme().palette;

  const calculateDifferenceInPercentage = (index) => {
    const item = data[index];
    return ((1 - item.systemB / item.systemA) * 100).toFixed();
  };

  return (
    <BarChart
      height={600}
      sx={{ py: 2, bgcolor: "rgba(255, 255, 255, 0.5)", borderRadius: 2 }}
      dataset={data}
      xAxis={[
        {
          label: "Енергоспоживання, кВт·год",
        },
      ]}
      yAxis={[
        {
          scaleType: "band",
          dataKey: "month",
          categoryGapRatio: 0,
          barGapRatio: 0,
        },
      ]}
      grid={{ vertical: true }}
      slotProps={{
        legend: {
          direction: "column",
          position: { vertical: "middle", horizontal: "right" },
        },
      }}
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
    />
  );
}
