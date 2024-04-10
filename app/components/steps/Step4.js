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
  Tabs,
  Typography,
} from "@mui/material";
import Information from "../Information";
import InputsContainer from "../InputsContainer";
import { Controller, useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";

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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Box>
  );
}

const ceilingTypes = [
  "Суміщене покриття",
  "Технічне (тепле) горище",
  "Холодне горище багатоповерхових будівель",
  "Холодне горище односімейних будівель",
];

export default function Step4() {
  const [value, setValue] = useState(0);
  const {
    formState: { errors },
    control,
  } = useFormContext();

  useEffect(() => {
    control.register("ceiling.type", { required: "Оберіть тип даху" });
    control.register("ceiling.type1", { required: "Оберіть тип даху" });
  }, [control]);

  const handleChange = (event, newWalue) => {
    setValue(newWalue);
  };

  return (
    <Box height="100%" display="flex" gap={3}>
      <InputsContainer>
        <Stack spacing={2}>
          <Tabs value={value} onChange={handleChange} variant="fullWidth">
            <Tab label="Дах" />
            <Tab label="Підлога" />
          </Tabs>
          <TabPanel value={value} index={0}>
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
          </TabPanel>
          <TabPanel value={value} index={1}>
            <FormControl error={!!errors.ceiling?.type1} fullWidth>
              <InputLabel id="ceiling.type" variant="filled">
                Тип даху
              </InputLabel>
              <Controller
                name="ceiling.type1"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select labelId="ceiling.type1" variant="filled" {...field}>
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
                {errors.ceiling?.type1?.message || " "}
              </FormHelperText>
            </FormControl>
          </TabPanel>
        </Stack>
      </InputsContainer>
      <Information>
        <Info4 />
      </Information>
    </Box>
  );
}
