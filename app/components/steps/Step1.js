"use client";

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

const cities = [
  { name: "Ай-Петрі", region: "Автономна Республіка Крим" },
  { name: "Клепиніне", region: "Автономна Республіка Крим" },
  { name: "Сімферополь", region: "Автономна Республіка Крим" },
  { name: "Феодосія", region: "Автономна Республіка Крим" },
  { name: "Ялта", region: "Автономна Республіка Крим" },
  { name: "Вінниця", region: "Вінницька область" },
  { name: "Ковель", region: "Волинська область" },
  { name: "Луцьк", region: "Волинська область" },
  { name: "Дніпро", region: "Дніпропетровська область" },
  { name: "Комісарівка", region: "Дніпропетровська область" },
  { name: "Кривий Ріг", region: "Дніпропетровська область" },
  { name: "Донецьк", region: "Донецька область" },
  { name: "Житомир", region: "Житомирська область" },
  { name: "Овруч", region: "Житомирська область" },
  { name: "Берегове", region: "Закарпатська область" },
  { name: "Міжгір'я", region: "Закарпатська область" },
  { name: "Плай", region: "Закарпатська область" },
  { name: "Рахів", region: "Закарпатська область" },
  { name: "Ужгород", region: "Закарпатська область" },
  { name: "Хуст", region: "Закарпатська область" },
  { name: "Гуляйполе", region: "Запорізька область" },
  { name: "Запоріжжя", region: "Запорізька область" },
  { name: "Кирилівка", region: "Запорізька область" },
  { name: "Івано-Франківськ", region: "Івано-Франківська область" },
  { name: "Пожежівська", region: "Івано-Франківська область" },
  { name: "Гайворон", region: "Кіровоградська область" },
  { name: "Знам'янка", region: "Кіровоградська область" },
  { name: "Кропивницький", region: "Кіровоградська область" },
  { name: "Київ", region: "Київська область" },
  { name: "Миронівка", region: "Київська область" },
  { name: "Луганськ", region: "Луганська область" },
  { name: "Львів", region: "Львівська область" },
  { name: "Миколаїв", region: "Миколаївська область" },
  { name: "Ізмаїл", region: "Одеська область" },
  { name: "Любашівка", region: "Одеська область" },
  { name: "Одеса", region: "Одеська область" },
  { name: "Роздільна", region: "Одеська область" },
  { name: "Сарата", region: "Одеська область" },
  { name: "Лубни", region: "Полтавська область" },
  { name: "Полтава", region: "Полтавська область" },
  { name: "Рівне", region: "Рівненська область" },
  { name: "Сарни", region: "Рівненська область" },
  { name: "Ромни", region: "Сумська область" },
  { name: "Суми", region: "Сумська область" },
  { name: "Тернопіль", region: "Тернопільська область" },
  { name: "Лозова", region: "Харківська область" },
  { name: "Харків", region: "Харківська область" },
  { name: "Асканія-Нова", region: "Херсонська область" },
  { name: "Генічеськ", region: "Херсонська область" },
  { name: "Херсон", region: "Херсонська область" },
  { name: "Хмельницький", region: "Хмельницька область" },
  { name: "Золотоноша", region: "Черкаська область" },
  { name: "Умань", region: "Черкаська область" },
  { name: "Черкаси", region: "Черкаська область" },
  { name: "Чернівці", region: "Чернівецька область" },
  { name: "Семенівка", region: "Чернігівська область" },
  { name: "Чернігів", region: "Чернігівська область" },
];

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
              options={cities}
              getOptionLabel={(city) => {
                return city.name;
              }}
              groupBy={(city) => city.region}
              value={
                value
                  ? cities.find((city) => {
                      return value === city.name;
                    }) ?? null
                  : null
              }
              onChange={(event, newValue) => {
                onChange(newValue ? newValue.name : null);
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
