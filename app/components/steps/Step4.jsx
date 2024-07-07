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
  const { control, formState } = useFormContext();
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
