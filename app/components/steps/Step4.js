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
  Typography,
  Zoom,
} from "@mui/material";
import Information from "../Information";
import InputsContainer from "../InputsContainer";
import { Controller, useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { CancelRounded, CheckCircleRounded } from "@mui/icons-material";
import AutocompleteWithModal from "../AutocompleteWithModal";
import LayerForm from "../LayerForm";

const Info4 = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="h5">Примітка</Typography>
      <Typography variant="body1">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem iusto
        amet beatae aut sapiente recusandae ratione consequuntur maiores,
        commodi autem reiciendis illo nostrum adipisci accusantium sunt quidem
        voluptate illum voluptatum?
      </Typography>
    </Stack>
  );
};

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
  const [value, setValue] = useState("ceiling");
  const {
    formState: { errors },
    control,
  } = useFormContext();

  useEffect(() => {
    control.register("ceiling.type", { required: "Оберіть тип даху" });
    control.register("ceiling.layers", { required: "Додайте хоча б один шар" });
    control.register("floor.type", { required: "Оберіть тип підлоги" });
    control.register("floor.layers", { required: "Додайте хоча б один шар" });
  }, [control, value]);

  const handleChange = (event, newWalue) => {
    setValue(newWalue);
  };

  const isCeilingInvalid = errors.ceiling?.type || errors.ceiling?.layers;
  const isFloorInvalid = errors.floor?.type || errors.floor?.layers;

  return (
    <Box height="100%" display="flex" gap={3}>
      <InputsContainer>
        <Stack spacing={2}>
          <Typography variant="h4">Горизонтальні конструкції</Typography>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} variant="fullWidth">
                <Tab
                  label="Дах"
                  value="ceiling"
                  sx={{ minHeight: "42px" }}
                  icon={
                    isCeilingInvalid ? (
                      <Zoom in={true}>
                        <CancelRounded color="error" />
                      </Zoom>
                    ) : (
                      <CheckCircleRounded />
                    )
                  }
                  iconPosition="start"
                />
                <Tab
                  label="Підлога"
                  value="floor"
                  sx={{ minHeight: "42px" }}
                  icon={
                    isFloorInvalid ? (
                      <Zoom in={true}>
                        <CancelRounded color="error" />
                      </Zoom>
                    ) : (
                      <CheckCircleRounded />
                    )
                  }
                  iconPosition="start"
                />
              </TabList>
            </Box>
            <TabPanel value="ceiling" sx={{ p: 0 }}>
              <FormControl error={!!errors.ceiling?.type} fullWidth>
                <InputLabel id="ceiling.type" variant="filled">
                  Тип даху
                </InputLabel>
                <Controller
                  name="ceiling.type"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select labelId="ceiling.type" variant="filled" {...field}>
                      {ceilingTypes.map((option) => (
                        <MenuItem
                          key={option}
                          value={option}
                          sx={{ whiteSpace: "normal" }}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>
                  {errors.ceiling?.type?.message || " "}
                </FormHelperText>
              </FormControl>
              <AutocompleteWithModal
                name="ceiling.layers"
                label="Шари конструкції"
                optionPrefix="Шар №"
                addTitlePrefix="Додати шар №"
                editTitlePrefix="Редагувати шар №"
              >
                <LayerForm />
              </AutocompleteWithModal>
            </TabPanel>
            <TabPanel value="floor" sx={{ p: 0 }}>
              <FormControl error={!!errors.floor?.type} fullWidth>
                <InputLabel id="floor.type" variant="filled">
                  Тип підлоги
                </InputLabel>
                <Controller
                  name="floor.type"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select labelId="floor.type" variant="filled" {...field}>
                      {floorTypes.map((option) => (
                        <MenuItem
                          key={option}
                          value={option}
                          sx={{ whiteSpace: "normal" }}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>
                  {errors.floor?.type?.message || " "}
                </FormHelperText>
              </FormControl>
            </TabPanel>
          </TabContext>
        </Stack>
      </InputsContainer>
      <Information>
        <Info4 />
      </Information>
    </Box>
  );
}
