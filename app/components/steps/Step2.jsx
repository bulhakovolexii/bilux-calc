"use client";

import airPermeabilityClasses from "@/app/model/reference-data/airPermeabilityClasses";
import constructionTypes from "@/app/model/reference-data/constructionTypes";
import heatCapacityClasses from "@/app/model/reference-data/heatCapacityClasses";
import purposes from "@/app/model/reference-data/purposes";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export default function Step2() {
  const { control } = useFormContext();

  return (
    <Stack spacing={1}>
      <Typography variant="h4">Загальні відомості про будівлю</Typography>
      <Controller
        name="purpose"
        control={control}
        rules={{
          required: "Оберіть функційне призначення будівлі",
        }}
        render={({ field, fieldState: { error } }) => {
          const { onChange, value, ref } = field;
          return (
            <FormControl error={!!error} variant="filled">
              <InputLabel>Функційне призначення</InputLabel>
              <Select
                value={value || ""}
                onChange={(event) => onChange(event.target.value)}
                inputRef={ref}
              >
                {purposes.map(({ purpose }) => (
                  <MenuItem
                    key={purpose}
                    value={purpose}
                    sx={{ whiteSpace: "normal" }}
                  >
                    {purpose}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{error?.message || " "}</FormHelperText>
            </FormControl>
          );
        }}
      />
      <Controller
        name="heatCapacityClass"
        control={control}
        rules={{
          required: "Оберіть клас теплоємності будівлі",
        }}
        render={({ field, fieldState: { error } }) => {
          const { onChange, value, ref } = field;
          return (
            <FormControl error={!!error} variant="filled">
              <InputLabel>Клас теплоємності</InputLabel>
              <Select
                value={value || ""}
                onChange={(event) => onChange(event.target.value)}
                inputRef={ref}
              >
                {heatCapacityClasses.map(({ heatCapacityClass }) => (
                  <MenuItem
                    key={heatCapacityClass}
                    value={heatCapacityClass}
                    sx={{ whiteSpace: "normal" }}
                  >
                    {heatCapacityClass}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{error?.message || " "}</FormHelperText>
            </FormControl>
          );
        }}
      />
      <Controller
        name="airPermeabilityClass"
        control={control}
        rules={{
          required: "Оберіть рівень герметичності будівлі",
        }}
        render={({ field, fieldState: { error } }) => {
          const { onChange, value, ref } = field;
          return (
            <FormControl error={!!error} variant="filled">
              <InputLabel>Рівень герметичності</InputLabel>
              <Select
                value={value || ""}
                onChange={(event) => onChange(event.target.value)}
                inputRef={ref}
              >
                {airPermeabilityClasses.map(({ airPermeabilityClass }) => (
                  <MenuItem
                    key={airPermeabilityClass}
                    value={airPermeabilityClass}
                    sx={{ whiteSpace: "normal" }}
                  >
                    {airPermeabilityClass}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{error?.message || " "}</FormHelperText>
            </FormControl>
          );
        }}
      />
      <Controller
        name="constructionType"
        control={control}
        rules={{
          required: "Оберіть тип зовнішніх стін",
        }}
        render={({ field, fieldState: { error } }) => {
          const { onChange, value, ref } = field;
          return (
            <FormControl error={!!error} variant="filled">
              <InputLabel>Тип зовнішніх стін</InputLabel>
              <Select
                value={value || ""}
                onChange={(event) => onChange(event.target.value)}
                inputRef={ref}
              >
                {constructionTypes.map(({ constructionType }) => (
                  <MenuItem
                    key={constructionType}
                    value={constructionType}
                    sx={{ whiteSpace: "normal" }}
                  >
                    {constructionType}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{error?.message || " "}</FormHelperText>
            </FormControl>
          );
        }}
      />
    </Stack>
  );
}
