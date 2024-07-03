"use client";

import controlTypes from "@/app/model/reference-data/controlTypes";
import heatingDevices from "@/app/model/reference-data/heatingDevices";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

export default function Step7() {
  const { control, watch } = useFormContext();
  const [filteredSubtypes, setFilteredSubtypes] = useState([]);

  const floorHeight = watch("floorHeight");
  const selectedType = watch("system.heatingDevices.type");

  const filteredByHeightHeatingDevices = heatingDevices.find(
    (height) => floorHeight > height.lower && floorHeight <= height.upper
  ).heatingDevices;

  useEffect(() => {
    const subtypes = filteredByHeightHeatingDevices.filter(
      (item) => item.subtype && item.type === selectedType
    );

    setFilteredSubtypes(subtypes);
  }, [selectedType, filteredByHeightHeatingDevices]);

  const uniqueHeatingDevicesTypes = filteredByHeightHeatingDevices.reduce(
    (acc, current) => {
      if (!acc.find((item) => item.type === current.type)) {
        acc.push(current);
      }
      return acc;
    },
    []
  );

  return (
    <Stack spacing={1}>
      <Typography variant="h4">
        Опалювальні прилади та контроль температури
      </Typography>
      <Controller
        name="system.heatingDevices.type"
        control={control}
        rules={{
          required: "Оберіть тип опалювальних приладів",
        }}
        render={({ field, fieldState: { error } }) => {
          const { onChange, value, ref } = field;
          return (
            <FormControl error={!!error} variant="filled">
              <InputLabel>Опалювальні прилади</InputLabel>
              <Select
                value={value || ""}
                onChange={(event) => onChange(event.target.value)}
                inputRef={ref}
              >
                {uniqueHeatingDevicesTypes.map(({ type }) => (
                  <MenuItem
                    key={type}
                    value={type}
                    sx={{ whiteSpace: "normal" }}
                  >
                    {type}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{error?.message || " "}</FormHelperText>
            </FormControl>
          );
        }}
      />
      {filteredSubtypes.length > 0 && (
        <Controller
          name="system.heatingDevices.subtype"
          control={control}
          rules={{
            required: "Оберіть умови монтажу",
          }}
          render={({ field, fieldState: { error } }) => {
            const { onChange, value, ref } = field;
            return (
              <FormControl error={!!error} variant="filled">
                <InputLabel>Умови монтажу приладів</InputLabel>
                <Select
                  value={value || ""}
                  onChange={(event) => onChange(event.target.value)}
                  inputRef={ref}
                >
                  {filteredSubtypes.map(({ subtype }) => (
                    <MenuItem
                      key={subtype}
                      value={subtype}
                      sx={{ whiteSpace: "normal" }}
                    >
                      {subtype}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{error?.message || " "}</FormHelperText>
              </FormControl>
            );
          }}
        />
      )}
      <Controller
        name="system.controlType"
        control={control}
        rules={{
          required: "Оберіть регулювання температури приміщення",
        }}
        render={({ field, fieldState: { error } }) => {
          const { onChange, value, ref } = field;
          return (
            <FormControl error={!!error} variant="filled">
              <InputLabel>Регулювання температури приміщення</InputLabel>
              <Select
                value={value || ""}
                onChange={(event) => onChange(event.target.value)}
                inputRef={ref}
              >
                {controlTypes.map(({ type }) => (
                  <MenuItem
                    key={type}
                    value={type}
                    sx={{ whiteSpace: "normal" }}
                  >
                    {type}
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
