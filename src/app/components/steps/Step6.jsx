"use client";

import heatGenerators from "@/app/model/reference-data/heatGenerators";
import systemTypes from "@/app/model/reference-data/systemTypes";
import temperatureGradients from "@/app/model/reference-data/temperatureGradients";
import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

export default function Step6() {
  const { control, watch } = useFormContext();
  const [filteredSubtypes, setFilteredSubtypes] = useState([]);
  const [directElectricHeatingIsSelected, setDirectElectricHeatingIsSelected] =
    useState(false);
  const selectedType = watch("system.type");
  const selectedGenerator = watch("system.heatGenerator");

  useEffect(() => {
    const subtypes = systemTypes.filter((item) => item.type === selectedType);

    setFilteredSubtypes(subtypes);
  }, [selectedType, systemTypes]);

  useEffect(() => {
    if (
      selectedGenerator ===
      "Електричні прилади прямого нагріву: конвектори, поверхневе опалення, променеве опалення, нагрівальний підлоговий кабель"
    ) {
      setDirectElectricHeatingIsSelected(true);
    } else {
      setDirectElectricHeatingIsSelected(false);
    }
  }, [selectedGenerator]);

  const uniqueSystemTypes = systemTypes.reduce((acc, current) => {
    if (!acc.find((item) => item.type === current.type)) {
      acc.push(current);
    }
    return acc;
  }, []);

  return (
    <Stack spacing={1}>
      <Typography variant="h4">
        Відомості про систему теплопостачання
      </Typography>
      <Controller
        name="system.heatGenerator"
        control={control}
        rules={{
          required: "Оберіть джерело теплопостачання",
        }}
        render={({ field, fieldState: { error } }) => {
          const { onChange, value, ref } = field;
          return (
            <Autocomplete
              options={heatGenerators}
              getOptionLabel={(option) => {
                return option.heatGenerator;
              }}
              groupBy={(option) => option.energyResource}
              value={
                value
                  ? heatGenerators.find((option) => {
                      return value === option.heatGenerator;
                    }) ?? null
                  : null
              }
              onChange={(event, newValue) => {
                onChange(newValue ? newValue.heatGenerator : null);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Джерело теплопостачаня"
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
      {!directElectricHeatingIsSelected && (
        <>
          <Stack direction="row" gap={1}>
            <Controller
              name="system.type"
              control={control}
              rules={{
                required: "Оберіть гідравлічну систему",
              }}
              render={({ field, fieldState: { error } }) => {
                const { onChange, value, ref } = field;
                return (
                  <FormControl
                    error={!!error}
                    variant="filled"
                    sx={{ flexGrow: 1 }}
                  >
                    <InputLabel>Гідравлічна система</InputLabel>
                    <Select
                      value={value || ""}
                      onChange={(event) => onChange(event.target.value)}
                      inputRef={ref}
                    >
                      {uniqueSystemTypes.map(({ type }) => (
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
            <Controller
              name="system.pipesInsulation"
              control={control}
              render={({ field }) => {
                return (
                  <FormControl sx={{ flexShrink: 0, mt: 1 }}>
                    <FormControlLabel
                      label="Труби ізольовані"
                      control={
                        <Switch
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      }
                    />
                  </FormControl>
                );
              }}
            />
          </Stack>
          <Controller
            name="system.temperatureGradient"
            control={control}
            rules={{
              required: "Оберіть температурний напір",
            }}
            render={({ field, fieldState: { error } }) => {
              const { onChange, value, ref } = field;
              return (
                <FormControl
                  error={!!error}
                  variant="filled"
                  sx={{ flexGrow: 1 }}
                >
                  <InputLabel>Температурний напір</InputLabel>
                  <Select
                    value={value || ""}
                    onChange={(event) => onChange(event.target.value)}
                    inputRef={ref}
                  >
                    {temperatureGradients.map(({ temperatureGradient }) => (
                      <MenuItem
                        key={temperatureGradient}
                        value={temperatureGradient}
                        sx={{ whiteSpace: "normal" }}
                      >
                        {temperatureGradient}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {error?.message || "За температури в приміщенні 20℃"}
                  </FormHelperText>
                </FormControl>
              );
            }}
          />
          <Controller
            name="system.hydraulicAdjustment"
            control={control}
            rules={{
              required: "Оберіть налагодження системи",
            }}
            render={({ field, fieldState: { error } }) => {
              const { onChange, value, ref } = field;
              return (
                <FormControl
                  error={!!error}
                  variant="filled"
                  sx={{ flexGrow: 1 }}
                >
                  <InputLabel>Налагодження системи</InputLabel>
                  <Select
                    value={value || ""}
                    onChange={(event) => onChange(event.target.value)}
                    inputRef={ref}
                  >
                    {filteredSubtypes.length === 0 ? (
                      <MenuItem disabled>
                        Спочатку оберіть гідравлічну систему
                      </MenuItem>
                    ) : (
                      filteredSubtypes.map(({ hydraulicAdjustment }) => (
                        <MenuItem
                          key={hydraulicAdjustment}
                          value={hydraulicAdjustment}
                          sx={{ whiteSpace: "normal" }}
                        >
                          {hydraulicAdjustment}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                  <FormHelperText>{error?.message || " "}</FormHelperText>
                </FormControl>
              );
            }}
          />
        </>
      )}
    </Stack>
  );
}
