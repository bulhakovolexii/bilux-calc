"use client";

import {
  ArrowBack,
  ArrowDownward,
  ArrowForward,
  ArrowUpward,
  CheckCircleRounded,
} from "@mui/icons-material";
import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import AutocompleteWithModal from "../AutocompleteWithModal";
import LayerForm from "../LayerForm";
import WindowsForm from "../WindowsForm";

const directions = ["north", "east", "south", "west"];

function CustomTab(props) {
  const { iconStart, iconEnd, label, ...other } = props;

  return (
    <Tab
      {...other}
      icon={
        <div style={{ display: "flex", alignItems: "center" }}>
          {iconStart && <span style={{ marginRight: 8 }}>{iconStart}</span>}
          {label}
          {iconEnd && <span style={{ marginLeft: 8 }}>{iconEnd}</span>}
        </div>
      }
      iconPosition="start"
    />
  );
}

const DirectionTab = (direction) => {
  const ukDirections = ["Пн", "Cх", "Пд", "Зх"];
  const rows = [
    <ArrowUpward />,
    <ArrowForward />,
    <ArrowDownward />,
    <ArrowBack />,
  ];
  return (
    <CustomTab
      label={ukDirections[directions.indexOf(direction)]}
      value={direction}
      sx={{ minHeight: "42px" }}
      iconStart={<CheckCircleRounded />}
      iconEnd={rows[directions.indexOf(direction)]}
    />
  );
};

export default function Step5() {
  const [tab, setTab] = useState("north");

  const handleChangeTab = (event, newTab) => {
    setTab(newTab);
  };

  const StepFields = (direction) => {
    const directionIndex = directions.indexOf(direction);
    return (
      <Box hidden={tab !== direction}>
        <AutocompleteWithModal
          name={`facades[${directionIndex}].layers`}
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
        <AutocompleteWithModal
          name={`facades[${directionIndex}].windows`}
          label="Вікна"
          optionPrefix="ВК-"
          addTitlePrefix="Додати вікна ВК-"
          editTitlePrefix="Редагувати вікна ВК-"
        >
          <WindowsForm />
        </AutocompleteWithModal>
        <AutocompleteWithModal
          name={`facades[${directionIndex}].doors`}
          label="Двері"
          optionPrefix="Д-"
          addTitlePrefix="Додати двері Д-"
          editTitlePrefix="Редагувати двері Д-"
        >
          <></>
        </AutocompleteWithModal>
        <AutocompleteWithModal
          name={`facades[${directionIndex}].inclusions`}
          label="Включення"
          optionPrefix="Включення №"
          addTitlePrefix="Додати включення №"
          editTitlePrefix="Редагувати Включення №"
        >
          <></>
        </AutocompleteWithModal>
      </Box>
    );
  };

  return (
    <Stack spacing={1}>
      <Typography variant="h4">Вертикальні конструкції</Typography>
      <Tabs
        value={tab}
        onChange={handleChangeTab}
        variant="fullWidth"
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        {directions.map((direction) => DirectionTab(direction))}
      </Tabs>
      {directions.map((direction) => StepFields(direction))}
    </Stack>
  );
}
