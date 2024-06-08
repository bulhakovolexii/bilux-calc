"use client";

import citiesClimateData from "@/app/model/reference-data/citiesClimateData";
import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export default function Step1() {
  const { control } = useFormContext();

  return (
    <Stack spacing={1}>
      <Typography variant="h4">Дані про місцевість</Typography>
      <Controller
        name="city"
        control={control}
        rules={{
          required: "Оберіть місто",
        }}
        render={({ field, fieldState: { error } }) => {
          const { onChange, value, ref } = field;
          return (
            <Autocomplete
              options={citiesClimateData}
              getOptionLabel={(city) => {
                return city.city;
              }}
              groupBy={(city) => city.region}
              value={
                value
                  ? citiesClimateData.find((city) => {
                      return value === city.city;
                    }) ?? null
                  : null
              }
              onChange={(event, newValue) => {
                onChange(newValue ? newValue.city : null);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Місто"
                  variant="filled"
                  inputRef={ref}
                  error={!!error}
                  helperText={error?.message || " "}
                />
              )}
            />
          );
        }}
      />
      <Controller
        name="terrain"
        control={control}
        rules={{
          required: "Оберіть тип місцевості",
        }}
        render={({ field, fieldState: { error } }) => {
          const { onChange, value, ref } = field;
          return (
            <FormControl error={!!error}>
              <FormLabel>Тип місцевості</FormLabel>
              <RadioGroup
                value={value ? value : null}
                onChange={(event) => onChange(event.target.value)}
                row
                sx={{ gap: 1, justifyContent: "center" }}
              >
                <FormControlLabel
                  value="A"
                  label="A"
                  labelPlacement="top"
                  control={<Radio />}
                />
                <FormControlLabel
                  value="B"
                  label="B"
                  labelPlacement="top"
                  control={<Radio />}
                  inputRef={ref}
                />
                <FormControlLabel
                  value="C"
                  label="C"
                  labelPlacement="top"
                  control={<Radio />}
                />
              </RadioGroup>
              <FormHelperText>
                {error?.message || 'У разі невизначенності оберіть тип "B"'}
              </FormHelperText>
            </FormControl>
          );
        }}
      />
    </Stack>
  );
}
