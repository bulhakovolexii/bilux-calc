"use client";

import { Stack, TextField, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export default function Step3() {
  const { control } = useFormContext();

  return (
    <Stack spacing={1}>
      <Typography variant="h4">Базова геометрія будівлі</Typography>
      <Controller
        name="buildingWidth"
        control={control}
        rules={{
          required: "Введіть ширину будівлі",
          min: {
            value: "0.1",
            message: "Ширина повинна бути більше нуля",
          },
        }}
        render={({ field, fieldState: { error } }) => {
          const { onChange, value, ref } = field;
          return (
            <TextField
              type="number"
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              inputRef={ref}
              inputProps={{ inputMode: "decimal", min: 0.1, step: 0.01 }}
              InputProps={{ endAdornment: "м", sx: { gap: 1 } }}
              variant="filled"
              label="Ширина"
              error={!!error}
              helperText={
                error?.message ||
                "Проекція північного/південного фасаду (в межах внутрішніх поверхонь)"
              }
            />
          );
        }}
      />
      <Controller
        name="buildingLength"
        control={control}
        rules={{
          required: "Введіть довжину будівлі",
          min: {
            value: "0.1",
            message: "Довжина повинна бути більше нуля",
          },
        }}
        render={({ field, fieldState: { error } }) => {
          const { onChange, value, ref } = field;
          return (
            <TextField
              type="number"
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              inputRef={ref}
              inputProps={{ min: 0.1, step: 0.01 }}
              InputProps={{ endAdornment: "м", sx: { gap: 1 } }}
              variant="filled"
              label="Довжина"
              error={!!error}
              helperText={
                error?.message ||
                "Проекція східного/західного фасаду  (в межах внутрішніх поверхонь)"
              }
            />
          );
        }}
      />
      <Stack direction="row" spacing={1}>
        <Controller
          name="floorHeight"
          control={control}
          rules={{
            required: "Введіть висоту поверху",
            min: {
              value: "0.1",
              message: "Висота поверху повинна бути більше нуля",
            },
          }}
          render={({ field, fieldState: { error } }) => {
            const { onChange, value, ref } = field;
            return (
              <TextField
                type="number"
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                inputRef={ref}
                inputProps={{ min: 0.1, step: 0.01 }}
                InputProps={{ endAdornment: "м", sx: { gap: 1 } }}
                variant="filled"
                fullWidth
                label="Висота поверху"
                error={!!error}
                helperText={
                  error?.message || "Без врахування підвалу та горища"
                }
              />
            );
          }}
        />
        <Controller
          name="numberOfFloors"
          control={control}
          rules={{
            required: "Введіть кількість поверхів",
            min: {
              value: "1",
              message: "Кількість поверхів повинна бути більше нуля",
            },
            validate: (value) =>
              Number.isInteger(parseFloat(value)) || "Введіть ціле число",
          }}
          render={({ field, fieldState: { error } }) => {
            const { onChange, value, ref } = field;
            return (
              <TextField
                type="number"
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                inputRef={ref}
                inputProps={{ inputMode: "numeric", min: 1, step: 1 }}
                variant="filled"
                fullWidth
                label="Кількість поверхів"
                error={!!error}
                helperText={error?.message || " "}
              />
            );
          }}
        />
      </Stack>
    </Stack>
  );
}
