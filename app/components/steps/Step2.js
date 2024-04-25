"use client";

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

const purposes = [
  "Одноквартирні будинки",
  "Багатоквартирні будинки, гуртожитки",
  "Громадські будівлі адміністративного призначення, офіси",
  "Будівлі закладів освіти",
  "Будівлі закладів дошкільної освіти",
  "Будівлі закладів охорони здоров’я",
  "Готелі",
  "Ресторани",
  "Спортивні заклади",
  "Будівлі закладів гуртової та роздрібної торгівлі",
  "Будівлі культурно-розважальних установ",
  "Інші види будівель",
];

const heatCapacityClasses = [
  "Дуже легкий",
  "Легкий",
  "Середній",
  "Важкий",
  "Дуже важкий",
];

const tightnessOptions = [
  "Продувна",
  "Не герметична",
  "Слабо герметична",
  "Герметична",
];

const typeAndConditionOptions = [
  "Неутеплені, залізобетонні панелі або кладка з крупноблокових елементів з міжпанельними стиками в незадовільному стані",
  "Неутеплені, кладка з дрібноштучних виробів у незадовільному стані",
  "Утеплені мінераловатними матеріалами в задовільному стані",
  "Утеплені органічними матеріалами в задовільному стані",
];

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
              <InputLabel>Тип місцевості</InputLabel>
              <Select
                value={value || ""}
                onChange={(event) => onChange(event.target.value)}
                inputRef={ref}
              >
                {purposes.map((purpose) => (
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
          required: "Оберіть характеристику герметичності будівлі",
        }}
        render={({ field, fieldState: { error } }) => {
          const { onChange, value, ref } = field;
          return (
            <FormControl error={!!error} variant="filled">
              <InputLabel>Характеристика герметичності</InputLabel>
              <Select
                value={value || ""}
                onChange={(event) => onChange(event.target.value)}
                inputRef={ref}
              >
                {heatCapacityClasses.map((heatCapacityClass) => (
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
        name="tightness"
        control={control}
        rules={{
          required: "Оберіть тип і стан стін будівлі",
        }}
        render={({ field, fieldState: { error } }) => {
          const { onChange, value, ref } = field;
          return (
            <FormControl error={!!error} variant="filled">
              <InputLabel>Тип і стан стін</InputLabel>
              <Select
                value={value || ""}
                onChange={(event) => onChange(event.target.value)}
                inputRef={ref}
              >
                {tightnessOptions.map((tightness) => (
                  <MenuItem
                    key={tightness}
                    value={tightness}
                    sx={{ whiteSpace: "normal" }}
                  >
                    {tightness}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{error?.message || " "}</FormHelperText>
            </FormControl>
          );
        }}
      />
      <Controller
        name="typeAndCondition"
        control={control}
        rules={{
          required: "Оберіть функційне призначення будівлі",
        }}
        render={({ field, fieldState: { error } }) => {
          const { onChange, value, ref } = field;
          return (
            <FormControl error={!!error} variant="filled">
              <InputLabel>Тип місцевості</InputLabel>
              <Select
                value={value || ""}
                onChange={(event) => onChange(event.target.value)}
                inputRef={ref}
              >
                {typeAndConditionOptions.map((typeAndCondition) => (
                  <MenuItem
                    key={typeAndCondition}
                    value={typeAndCondition}
                    sx={{ whiteSpace: "normal" }}
                  >
                    {typeAndCondition}
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
