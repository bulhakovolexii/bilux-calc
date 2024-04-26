"use client";

import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

const ceilingTypes = [
  "Суміщене покриття",
  "Технічне (тепле) горище",
  "Холодне горище багатоповерхових будівель",
  "Холодне горище односімейних будівель",
];

const floorTypes = [
  "Технічне підпілля",
  "Підлога на ґрунті",
  "Опалюваний підвал (цокольний поверх)",
];

export default function Step4() {
  const {
    control,
    formState: { submitCount },
    getFieldState,
  } = useFormContext();
  const [tab, setTab] = useState("ceiling");

  useEffect(() => {
    const floorTabIsInvalid = getFieldState("floor.type").invalid;
    const ceilingTabIsInvalid = getFieldState("ceiling.type").invalid;

    if (!floorTabIsInvalid) {
      setTab("ceiling");
    } else if (!ceilingTabIsInvalid) {
      setTab("floor");
    }
  }, [submitCount]);

  const handleChangeTab = (event, newTab) => {
    setTab(newTab);
  };

  return (
    <Stack spacing={1}>
      <Typography variant="h4">Горизонтальні конструкції</Typography>
      <Tabs
        value={tab}
        onChange={handleChangeTab}
        variant="fullWidth"
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tab label="Дах" value="ceiling" />
        <Tab label="Підлога" value="floor" />
      </Tabs>
      <Box hidden={tab !== "ceiling"}>
        <Controller
          name="ceiling.type"
          control={control}
          rules={{
            required: "Оберіть тип і стан стін будівлі",
          }}
          render={({ field, fieldState: { error } }) => {
            const { onChange, value, ref } = field;
            return (
              <FormControl error={!!error} variant="filled" fullWidth>
                <InputLabel>Тип і стан стін</InputLabel>
                <Select
                  value={value || ""}
                  onChange={(event) => onChange(event.target.value)}
                  inputRef={ref}
                >
                  {ceilingTypes.map((ceilingType) => (
                    <MenuItem
                      key={ceilingType}
                      value={ceilingType}
                      sx={{ whiteSpace: "normal" }}
                    >
                      {ceilingType}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{error?.message || " "}</FormHelperText>
              </FormControl>
            );
          }}
        />
      </Box>
      <Box hidden={tab !== "floor"}>
        <Controller
          name="floor.type"
          control={control}
          rules={{
            required: "Оберіть тип і стан стін будівлі",
          }}
          render={({ field, fieldState: { error } }) => {
            const { onChange, value, ref } = field;
            return (
              <FormControl error={!!error} variant="filled" fullWidth>
                <InputLabel>Тип і стан стін</InputLabel>
                <Select
                  value={value || ""}
                  onChange={(event) => onChange(event.target.value)}
                  inputRef={ref}
                >
                  {floorTypes.map((floorType) => (
                    <MenuItem
                      key={floorType}
                      value={floorType}
                      sx={{ whiteSpace: "normal" }}
                    >
                      {floorType}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{error?.message || " "}</FormHelperText>
              </FormControl>
            );
          }}
        />
      </Box>
    </Stack>
  );
}
