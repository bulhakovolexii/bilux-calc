"use client";

import { CancelRounded, CheckCircleRounded } from "@mui/icons-material";
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
  TextField,
  Zoom,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import AutocompleteWithModal from "../AutocompleteWithModal";
import LayerForm from "../LayerForm";

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
  const { control, formState, watch } = useFormContext();
  const [tab, setTab] = useState("ceiling");
  const [floorTabIsInvalid, setFloorTabIsInvalid] = useState(null);
  const [ceilingTabIsInvalid, setCeilingTabIsInvalid] = useState(null);

  useEffect(() => {
    const ceilingErrors =
      !!formState.errors?.ceiling?.type || !!formState.errors?.ceiling?.layers;
    const floorErrors =
      !!formState.errors?.floor?.type || !!formState.errors?.floor?.layers;
    setCeilingTabIsInvalid(ceilingErrors);
    setFloorTabIsInvalid(floorErrors);
    if (floorTabIsInvalid && !ceilingTabIsInvalid && tab !== "floor") {
      setTab("floor");
    } else if (ceilingTabIsInvalid && !floorTabIsInvalid && tab !== "ceiling") {
      setTab("ceiling");
    }
  }, [formState]);

  const handleChangeTab = (event, newTab) => {
    setTab(newTab);
  };

  const floorTypeIsBasement =
    watch("floor.type") === "Опалюваний підвал (цокольний поверх)";

  return (
    <Stack spacing={1}>
      <Typography variant="h4">Горизонтальні конструкції</Typography>
      <Tabs
        value={tab}
        onChange={handleChangeTab}
        variant="fullWidth"
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tab
          label="Дах"
          value="ceiling"
          sx={{ minHeight: "42px" }}
          iconPosition="start"
          icon={
            ceilingTabIsInvalid ? (
              <Zoom in={true}>
                <CancelRounded color="error" />
              </Zoom>
            ) : (
              <CheckCircleRounded />
            )
          }
        />
        <Tab
          label="Підлога"
          value="floor"
          sx={{ minHeight: "42px" }}
          iconPosition="start"
          icon={
            floorTabIsInvalid ? (
              <Zoom in={true}>
                <CancelRounded color="error" />
              </Zoom>
            ) : (
              <CheckCircleRounded />
            )
          }
        />
      </Tabs>
      <Box hidden={tab !== "ceiling"}>
        <Controller
          name="ceiling.type"
          control={control}
          rules={{
            required: "Оберіть тип даху",
          }}
          render={({ field, fieldState: { error } }) => {
            const { onChange, value, ref } = field;
            return (
              <FormControl error={!!error} variant="filled" fullWidth>
                <InputLabel>Тип даху</InputLabel>
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
        <AutocompleteWithModal
          name="ceiling.layers"
          control={control}
          rules={{
            validate: (value) => value.length > 0 || `Додайте хоча б один шар`,
          }}
          label="Шари конструкції"
          optionPrefix="Шар №"
          addTitlePrefix="Додати шар №"
          editTitlePrefix="Редагувати шар №"
        >
          <LayerForm />
        </AutocompleteWithModal>
      </Box>
      <Box hidden={tab !== "floor"}>
        <Controller
          name="floor.type"
          control={control}
          rules={{
            required: "Оберіть тип підлоги",
          }}
          render={({ field, fieldState: { error } }) => {
            const { onChange, value, ref } = field;
            return (
              <FormControl error={!!error} variant="filled" fullWidth>
                <InputLabel>Тип підлоги</InputLabel>
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
        {floorTypeIsBasement && (
          <Controller
            name="floor.wallHeight"
            control={control}
            rules={{
              required: "Введіть висоту стін що контактують з грунтом",
              min: {
                value: "0.1",
                message: "Висота стін повинна бути більше нуля",
              },
            }}
            render={({ field, fieldState: { error } }) => {
              const { onChange, value, ref } = field;
              return (
                <TextField
                  fullWidth
                  type="number"
                  value={value || ""}
                  onChange={(e) => onChange(e.target.value)}
                  inputRef={ref}
                  inputProps={{ inputMode: "decimal", min: 0.1, step: 0.01 }}
                  InputProps={{ endAdornment: "м", sx: { gap: 1 } }}
                  variant="filled"
                  label="Висота стін що контактують з грунтом"
                  error={!!error}
                  helperText={error?.message || " "}
                />
              );
            }}
          />
        )}
        <AutocompleteWithModal
          name="floor.layers"
          control={control}
          rules={{
            validate: (value) => value.length > 0 || `Додайте хоча б один шар`,
          }}
          label="Шари конструкції"
          optionPrefix="Шар №"
          addTitlePrefix="Додати шар №"
          editTitlePrefix="Редагувати шар №"
        >
          <LayerForm />
        </AutocompleteWithModal>
      </Box>
    </Stack>
  );
}
