"use client";

import { useInputData } from "../context/InputDataContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Building from "../model/Building";
import monthlyDurationIntervals from "../model/reference-data/monthlyDurationIntervals";
import SavingsBarChart from "../components/SavingsBarChart";
import {
  Box,
  Stack,
  Divider,
  Grid,
  Container,
  Typography,
  Slider,
  Button,
} from "@mui/material";
import Background from "../components/Background";
import MyAppBar from "../components/MyAppBar";

const biluxSystem = {
  heatGenerator:
    "Електричні прилади прямого нагріву: конвектори, поверхневе опалення, променеве опалення, нагрівальний підлоговий кабель",
  heatingDevices: { type: "Стельові променеві обігрівачі" },
  controlType: "Двопозиційне регулювання",
};

const numberFormatter = (number, digits = 0) => {
  const toFixedNumber = +number.toFixed(digits);
  return toFixedNumber.toLocaleString("uk-UA", { useGrouping: true });
};

const results = (building, biluxBuilding) => {
  return monthlyDurationIntervals.map((month) => {
    const systemA = Math.round(building.energyConsumption(month));
    const systemB = Math.round(biluxBuilding.energyConsumption(month));
    return new Object({
      month: month.month,
      systemA: systemA,
      systemB: systemB,
      offset: Math.min(systemA, systemB),
      saving: systemA - systemB,
    });
  });
};

const SuccessfulResult = ({ inputData }) => {
  const building = new Building(inputData);
  const biluxBuilding = new Building({ ...inputData, system: biluxSystem });
  const defaultTemp = building.indoorTemperature;
  const [indoorTemp, setIndoorTemp] = useState(defaultTemp);
  const [barData, setBarData] = useState(results(building, biluxBuilding));
  useEffect(() => {
    building.setIndoorTemperature(indoorTemp);
    biluxBuilding.setIndoorTemperature(indoorTemp);
    setBarData(results(building, biluxBuilding));
    console.log(indoorTemp);
  }, [indoorTemp]);

  const annualSystemA = barData.reduce((sum, month) => sum + month.systemA, 0);
  const annualSystemB = barData.reduce((sum, month) => sum + month.systemB, 0);
  const savings = annualSystemA - annualSystemB;
  const savingsInPercentage = (1 - annualSystemB / annualSystemA) * 100;

  const marks = [
    {
      value: 10,
      label: "10°C",
    },
    {
      value: defaultTemp,
      label: `${defaultTemp}°C`,
    },
    {
      value: 28,
      label: "28°C",
    },
  ];

  const valuetext = (value) => {
    return `${value}°C`;
  };

  const resetTemp = () => {
    setIndoorTemp(defaultTemp);
  };

  const TempSlider = () => {
    return (
      <Box>
        <Typography>Температура повітря в будівлі</Typography>
        <Box display="flex" alignItems="flex-start" gap={4}>
          <Slider
            getAriaValueText={valuetext}
            min={10}
            max={28}
            defaultValue={indoorTemp}
            onChangeCommitted={(e, newValue) => setIndoorTemp(newValue)}
            step={0.5}
            valueLabelDisplay="auto"
            marks={marks}
          />
          <Button variant="contained" onClick={resetTemp}>
            Скинути
          </Button>
        </Box>
      </Box>
    );
  };

  return (
    <Grid container spacing={2} mt={1}>
      <Grid item xs={12} md={6} spacing={2}>
        <Stack spacing={2}>
          <Typography variant="h4" mt={2}>
            Результати розрахунку
          </Typography>
          <TempSlider />
          <Box display="flex" gap={1} flexWrap="wrap">
            <Typography variant="h6">
              Розрахункова потужність системи:
            </Typography>
            <Typography variant="h6" flexGrow={1} align="right">
              {numberFormatter(building.estimatedHeatGeneratorPower(-23), 2)},
              кВт
            </Typography>
          </Box>
          <Divider />
          <Box display="flex" gap={1} flexWrap="wrap">
            <Typography variant="h6">
              Розрахункове енергоспоживання користувацької системи:
            </Typography>
            <Typography variant="h6" flexGrow={1} align="right">
              {numberFormatter(annualSystemA)}, кВт
            </Typography>
          </Box>
          <Divider />
          <Box display="flex" gap={1} flexWrap="wrap">
            <Typography variant="h6">
              Розрахункове енергоспоживання системи BILUX:
            </Typography>
            <Typography variant="h6" flexGrow={1} align="right">
              {numberFormatter(annualSystemB)}, кВт
            </Typography>
          </Box>
          <Divider />
          <Box display="flex" gap={1} flexWrap="wrap">
            <Typography variant="h6">Скорочення енергоспоживання:</Typography>
            <Typography variant="h6" flexGrow={1} align="right">
              {savings}, кВт ({numberFormatter(savingsInPercentage, 1)}%)
            </Typography>
          </Box>
          <Divider />
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <SavingsBarChart data={barData} />
      </Grid>
    </Grid>
  );
};

export default function Results() {
  const router = useRouter();
  const { inputData } = useInputData();
  return !inputData.city ? (
    router.push("/")
  ) : (
    <Container maxWidth="lg">
      <MyAppBar color="transparent" />
      <Background maxWidth="lg" />
      <SuccessfulResult inputData={inputData} />
    </Container>
  );
}
