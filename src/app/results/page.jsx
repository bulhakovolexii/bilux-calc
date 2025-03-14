"use client";

import { useInputData } from "@/context/InputDataContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Building from "@/model/Building";
import monthlyDurationIntervals from "@/model/reference-data/monthlyDurationIntervals";
import SavingsBarChart from "@/components/SavingsBarChart";
import {
  Box,
  Stack,
  Divider,
  Grid,
  Container,
  Typography,
  Slider,
  Button,
  TextField,
} from "@mui/material";
import AppBar from "@/components/AppBar";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import EmailForm from "@/components/forms/EmailForm";
import useUnsavedChanges from "@/hooks/useUnsavedChanges";

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

const getEstimatedPower = (building) => {
  const fullPower = building.estimatedHeatGeneratorPower(-23);
  const power = new Object({
    full: fullPower,
    specific: (fullPower / building.conditionedArea()) * 1000,
  });

  return power;
};

const resourceTypes = [
  {
    type: "Горючі корисні копалини тверді",
    calorificValue: 7.8,
    units: "кг",
    defaultRate: 20,
    rate: 20,
  },
  {
    type: "Горючі корисні копалини скраплені та газоподібні",
    calorificValue: 9.3,
    units: "м³",
    defaultRate: 7.93,
    rate: 7.93,
  },
  {
    type: "Електроенергія",
    calorificValue: 1,
    units: "кВт·год",
    defaultRate: 4.32,
    rate: 4.23,
  },
  {
    type: "Солома",
    calorificValue: 4.3,
    units: "кг",
    defaultRate: 0.48,
    rate: 0.48,
  },
  {
    type: "Деревина",
    calorificValue: 3.9,
    units: "кг",
    defaultRate: 2.2,
    rate: 2.2,
  },
  {
    type: "Централізоване опалення",
    calorificValue: 1163,
    units: "Гкал",
    defaultRate: 1539.5,
    rate: 1539.5,
  },
];

const PdfChart = ({ barData, setImg }) => {
  return (
    <div
      style={{
        width: "1100px",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: "-3",
      }}
    >
      <SavingsBarChart
        data={barData}
        onImageGenerated={setImg}
        height={800}
        skipAnimation={true}
      />
    </div>
  );
};

const SuccessfulResult = ({ inputData }) => {
  const building = new Building(inputData);
  const biluxBuilding = new Building({ ...inputData, system: biluxSystem });
  const defaultTemp = building.indoorTemperature;
  const [indoorTemp, setIndoorTemp] = useState(defaultTemp);
  const [estimatedHeatGeneratorPower, setEstimatedHeatGeneratorPower] =
    useState(getEstimatedPower(building));
  const [barData, setBarData] = useState(results(building, biluxBuilding));
  const [userResource, setUserResource] = useState(
    resourceTypes.find(
      (resource) => resource.type === building.heatGenerator().energyResource
    )
  );
  const [electricity, setElectricity] = useState(
    resourceTypes.find((resource) => resource.type === "Електроенергія")
  );
  const { control } = useForm({ mode: "onChange" });
  const [openForm, setOpenForm] = useState(false);
  const [img, setImg] = useState();

  useEffect(() => {
    building.setIndoorTemperature(indoorTemp);
    biluxBuilding.setIndoorTemperature(indoorTemp);
    setBarData(results(building, biluxBuilding));
    setEstimatedHeatGeneratorPower(getEstimatedPower(building));
  }, [indoorTemp]);

  const handleOpenForm = () => {
    setOpenForm(!openForm);
  };

  const annualSystemA = barData.reduce((sum, month) => sum + month.systemA, 0);
  const annualSystemB = barData.reduce((sum, month) => sum + month.systemB, 0);
  const savings = annualSystemA - annualSystemB;
  const savingsInPercentage = (1 - annualSystemB / annualSystemA) * 100;

  const handleChangeUserResource = (newRate) => {
    const newUserResource = { ...userResource, rate: +newRate };
    setUserResource(newUserResource);
  };

  const handleChangeElectricity = (newRate) => {
    const newElectricity = { ...electricity, rate: +newRate };
    setElectricity(newElectricity);
    if (userResource.type === "Електроенергія") {
      setUserResource(newElectricity);
    }
  };

  const calculateEconomy = () => {
    const userCosts =
      (annualSystemA / userResource.calorificValue) * userResource.rate;
    const biluxCosts =
      (annualSystemB / electricity.calorificValue) * electricity.rate;
    const economy = userCosts - biluxCosts;

    return economy > 0 ? economy : 0;
  };

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
            min={marks[0].value}
            max={marks[2].value}
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
    <Grid
      container
      spacing={2}
      mt={1}
      sx={{ position: "relative", maxWidth: "100vw", overflow: "hidden" }}
    >
      <PdfChart barData={barData} setImg={setImg} />
      <EmailForm
        openForm={openForm}
        handleOpenForm={handleOpenForm}
        inputData={inputData}
        img={img}
        results={{
          indoorTemp,
          estimatedHeatGeneratorPower,
          annualSystemA,
          annualSystemB,
          savings,
          savingsInPercentage,
          userResource,
          electricity,
          economy: calculateEconomy(),
        }}
      />
      <Grid item xs={12} display="flex" justifyContent="space-between">
        <Button
          LinkComponent={Link}
          href="/questionnaire/step-7"
          color="primary"
          variant="contained"
          sx={{ mb: 2 }}
        >
          Назад
        </Button>
        <Button
          color="primary"
          variant="contained"
          sx={{ mb: 2 }}
          onClick={handleOpenForm}
        >
          Повний звіт
        </Button>
      </Grid>
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
              {numberFormatter(estimatedHeatGeneratorPower.full, 1)}, кВт (
              {numberFormatter(estimatedHeatGeneratorPower.specific)}, Вт/м²)
            </Typography>
          </Box>
          <Divider />
          <Box display="flex" gap={1} flexWrap="wrap">
            <Typography variant="h6">
              Розрахункове енергоспоживання користувацької системи:
            </Typography>
            <Typography variant="h6" flexGrow={1} align="right">
              {numberFormatter(annualSystemA)}, кВт·год
            </Typography>
          </Box>
          <Divider />
          <Box display="flex" gap={1} flexWrap="wrap">
            <Typography variant="h6">
              Розрахункове енергоспоживання системи BILUX:
            </Typography>
            <Typography variant="h6" flexGrow={1} align="right">
              {numberFormatter(annualSystemB)}, кВт·год
            </Typography>
          </Box>
          <Divider />
          <Box display="flex" gap={1} flexWrap="wrap">
            <Typography variant="h6">Скорочення енергоспоживання:</Typography>
            <Typography variant="h6" flexGrow={1} align="right">
              {numberFormatter(savings, 0)}, кВт·год (
              {numberFormatter(savingsInPercentage, 1)}%)
            </Typography>
          </Box>
          <Box>
            <Typography>Ціна енергоресурсу</Typography>
            <Stack direction="row" spacing={2}>
              {userResource.type !== "Електроенергія" && (
                <Controller
                  name="userResource"
                  rules={{
                    required: "Введіть вартість енергоресурсу",
                    min: {
                      value: "0.1",
                      message: "Вартість повинна бути більше нуля",
                    },
                  }}
                  control={control}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <TextField
                      fullWidth
                      type="number"
                      inputProps={{ min: 0.01, step: 0.01 }}
                      label={userResource.type}
                      InputProps={{
                        endAdornment: (
                          <Typography variant="caption">
                            грн/{userResource.units}
                          </Typography>
                        ),
                      }}
                      variant="filled"
                      defaultValue={userResource.rate}
                      value={value}
                      onChange={(e) => {
                        onChange(e.target.value);
                        handleChangeUserResource(e.target.value);
                      }}
                      error={!!error}
                      helperText={error?.message || " "}
                    />
                  )}
                />
              )}
              <Controller
                name="electricity"
                rules={{
                  required: "Введіть вартість електроенергії",
                  min: {
                    value: "0.1",
                    message: "Вартість повинна бути більше нуля",
                  },
                }}
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <TextField
                    fullWidth
                    type="number"
                    inputProps={{ min: 0.01, step: 0.01 }}
                    label={electricity.type}
                    InputProps={{
                      endAdornment: (
                        <Typography variant="caption">
                          грн/{electricity.units}
                        </Typography>
                      ),
                    }}
                    variant="filled"
                    defaultValue={electricity.rate}
                    value={value}
                    onChange={(e) => {
                      onChange(e.target.value);
                      handleChangeElectricity(e.target.value);
                    }}
                    error={!!error}
                    helperText={error?.message || " "}
                  />
                )}
              />
            </Stack>
          </Box>
          <Box display="flex" gap={1} flexWrap="wrap">
            <Typography variant="h4">Потенційна економія:</Typography>
            <Typography variant="h4" flexGrow={1} align="right">
              {numberFormatter(calculateEconomy(), 0)}, грн/рік
            </Typography>
          </Box>
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h4" mb={2}>
          Розподіл витрат по місяцям
        </Typography>
        <SavingsBarChart data={barData} height={600} skipAnimation={false} />
      </Grid>
    </Grid>
  );
};

export default function Results() {
  useUnsavedChanges();
  const router = useRouter();
  const { inputData } = useInputData();
  return !inputData.city ? (
    router.push("/")
  ) : (
    <>
      <Container maxWidth="lg" sx={{ mb: 2 }}>
        <AppBar color="transparent" />
        <SuccessfulResult inputData={inputData} />
      </Container>
    </>
  );
}
