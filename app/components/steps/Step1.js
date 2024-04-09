import {
  Autocomplete,
  Box,
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
import Information from "../Information";
import InputsContainer from "../InputsContainer";
import { Controller, useFormContext } from "react-hook-form";

const Info1 = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="h5">Характеристика місцевості</Typography>
      <Typography variant="body1">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem iusto
        amet beatae aut sapiente recusandae ratione consequuntur maiores,
        commodi autem reiciendis illo nostrum adipisci accusantium sunt quidem
        voluptate illum voluptatum?
      </Typography>
    </Stack>
  );
};

const cities = [
  { city: "Ай-Петрі", region: "Автономна Республіка Крим" },
  { city: "Клепиніне", region: "Автономна Республіка Крим" },
  { city: "Сімферополь", region: "Автономна Республіка Крим" },
  { city: "Феодосія", region: "Автономна Республіка Крим" },
  { city: "Ялта", region: "Автономна Республіка Крим" },
  { city: "Вінниця", region: "Вінницька область" },
  { city: "Ковель", region: "Волинська область" },
  { city: "Луцьк", region: "Волинська область" },
  { city: "Дніпро", region: "Дніпропетровська область" },
  { city: "Комісарівка", region: "Дніпропетровська область" },
  { city: "Кривий Ріг", region: "Дніпропетровська область" },
  { city: "Донецьк", region: "Донецька область" },
  { city: "Житомир", region: "Житомирська область" },
  { city: "Овруч", region: "Житомирська область" },
  { city: "Берегове", region: "Закарпатська область" },
  { city: "Міжгір'я", region: "Закарпатська область" },
  { city: "Плай", region: "Закарпатська область" },
  { city: "Рахів", region: "Закарпатська область" },
  { city: "Ужгород", region: "Закарпатська область" },
  { city: "Хуст", region: "Закарпатська область" },
  { city: "Гуляйполе", region: "Запорізька область" },
  { city: "Запоріжжя", region: "Запорізька область" },
  { city: "Кирилівка", region: "Запорізька область" },
  { city: "Івано-Франківськ", region: "Івано-Франківська область" },
  { city: "Пожежівська", region: "Івано-Франківська область" },
  { city: "Гайворон", region: "Кіровоградська область" },
  { city: "Знам'янка", region: "Кіровоградська область" },
  { city: "Кропивницький", region: "Кіровоградська область" },
  { city: "Київ", region: "Київська область" },
  { city: "Миронівка", region: "Київська область" },
  { city: "Луганськ", region: "Луганська область" },
  { city: "Львів", region: "Львівська область" },
  { city: "Миколаїв", region: "Миколаївська область" },
  { city: "Ізмаїл", region: "Одеська область" },
  { city: "Любашівка", region: "Одеська область" },
  { city: "Одеса", region: "Одеська область" },
  { city: "Роздільна", region: "Одеська область" },
  { city: "Сарата", region: "Одеська область" },
  { city: "Лубни", region: "Полтавська область" },
  { city: "Полтава", region: "Полтавська область" },
  { city: "Рівне", region: "Рівненська область" },
  { city: "Сарни", region: "Рівненська область" },
  { city: "Ромни", region: "Сумська область" },
  { city: "Суми", region: "Сумська область" },
  { city: "Тернопіль", region: "Тернопільська область" },
  { city: "Лозова", region: "Харківська область" },
  { city: "Харків", region: "Харківська область" },
  { city: "Асканія-Нова", region: "Херсонська область" },
  { city: "Генічеськ", region: "Херсонська область" },
  { city: "Херсон", region: "Херсонська область" },
  { city: "Хмельницький", region: "Хмельницька область" },
  { city: "Золотоноша", region: "Черкаська область" },
  { city: "Умань", region: "Черкаська область" },
  { city: "Черкаси", region: "Черкаська область" },
  { city: "Чернівці", region: "Чернівецька область" },
  { city: "Семенівка", region: "Чернігівська область" },
  { city: "Чернігів", region: "Чернігівська область" },
];

export default function Step1() {
  const {
    formState: { errors },
    control,
  } = useFormContext();

  return (
    <Box height="100%" display="flex" gap={3}>
      <InputsContainer>
        <Stack spacing={2}>
          <Typography variant="h4">Дані про місцевість</Typography>
          <Controller
            name="city"
            control={control}
            rules={{ required: "Оберіть місто" }}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={cities}
                groupBy={(option) => option.region}
                getOptionLabel={(option) => option.city}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Місто"
                    variant="filled"
                    error={!!errors.city}
                    helperText={errors.city?.message || " "}
                  />
                )}
                onChange={(e, value) => {
                  field.onChange(value?.city);
                }}
                value={
                  cities.find((option) => option.city === field.value) || null
                }
              />
            )}
          />
          <FormControl error={!!errors.terrain}>
            <FormLabel>Тип місцевості</FormLabel>
            <Controller
              name="terrain"
              control={control}
              defaultValue=""
              rules={{ required: "Оберіть варіант місцевості" }}
              render={({ field }) => (
                <RadioGroup
                  aria-label="options"
                  row
                  {...field}
                  sx={{ justifyContent: "space-around" }}
                >
                  <FormControlLabel
                    value="A"
                    control={<Radio />}
                    label="A"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="B"
                    control={<Radio />}
                    label="B"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="C"
                    control={<Radio />}
                    label="C"
                    labelPlacement="top"
                  />
                </RadioGroup>
              )}
            />
            <FormHelperText sx={{ mx: 0 }}>
              {errors.terrain?.message ||
                "У разі невизначенності оберіть тип B"}
            </FormHelperText>
          </FormControl>
        </Stack>
      </InputsContainer>
      <Information>
        <Info1 />
      </Information>
    </Box>
  );
}
