import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import Information from "../Information";
import InputsContainer from "../InputsContainer";
import { Controller, useFormContext } from "react-hook-form";

const Info2 = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="h5">Внутрішня теплоємність будівлі</Typography>
      <Typography variant="body1">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem iusto
        amet beatae aut sapiente recusandae ratione consequuntur maiores,
        commodi autem reiciendis illo nostrum adipisci accusantium sunt quidem
        voluptate illum voluptatum?
      </Typography>
    </Stack>
  );
};

const purposes = [
  "Одноквартирні будинки",
  "Багатоквартирні будинки, гуртожитки",
  "Громадські будівлі адміністративного призначення, офіси",
  "Будівлі закладів освіти",
  "Будівлі закладів дошкільної освіти",
  "Будівлі закладів охорони здоров’я",
  "Готелі",
  "Ресторани",
  "Спортивні заклади",
  "Будівлі закладів гуртової та роздрібної торгівлі",
  "Будівлі культурно-розважальних установ",
  "Інші види будівель",
];

const heatCapacityClasses = [
  "Дуже легкий",
  "Легкий",
  "Середній",
  "Важкий",
  "Дуже важкий",
];

const tightnessOptions = [
  "Продувна",
  "Не герметична",
  "Слабо герметична",
  "Герметична",
];

const typeAndConditionOptions = [
  "Неутеплені, залізобетонні панелі або кладка з крупноблокових елементів з міжпанельними стиками в незадовільному стані",
  "Неутеплені, кладка з дрібноштучних виробів у незадовільному стані",
  "Утеплені мінераловатними матеріалами в задовільному стані",
  "Утеплені органічними матеріалами в задовільному стані",
];

export default function Step2() {
  const {
    formState: { errors },
    control,
  } = useFormContext();

  return (
    <Box height="100%" display="flex" gap={3}>
      <InputsContainer>
        <Stack spacing={2}>
          <Typography variant="h4">Загальні відомості про будівлю</Typography>
          <FormControl error={!!errors.purpose}>
            <InputLabel id="purpose" variant="filled">
              Функційне призначення
            </InputLabel>
            <Controller
              name="purpose"
              rules={{ required: "Оберіть функційне призначення будівлі" }}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select labelId="purpose" variant="filled" {...field}>
                  {purposes.map((option) => (
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
            <FormHelperText>{errors.purpose?.message || " "}</FormHelperText>
          </FormControl>

          <FormControl error={!!errors.heatCapacityClass}>
            <InputLabel id="heatCapacityClass" variant="filled">
              Клас теплоємності
            </InputLabel>
            <Controller
              name="heatCapacityClass"
              rules={{ required: "Оберіть клас теплоємності будівлі" }}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select labelId="heatCapacityClass" variant="filled" {...field}>
                  {heatCapacityClasses.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>
              {errors.heatCapacityClass?.message || " "}
            </FormHelperText>
          </FormControl>

          <FormControl error={!!errors.tightness}>
            <InputLabel id="tightness" variant="filled">
              Характеристика герметичності
            </InputLabel>
            <Controller
              name="tightness"
              rules={{
                required: "Оберіть характеристику герметичності будівлі",
              }}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select labelId="tightness" variant="filled" {...field}>
                  {tightnessOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>{errors.tightness?.message || " "}</FormHelperText>
          </FormControl>

          <FormControl error={!!errors.typeAndCondition}>
            <InputLabel id="typeAndCondition" variant="filled">
              Тип і стан стін
            </InputLabel>
            <Controller
              name="typeAndCondition"
              rules={{
                required: "Оберіть тип і стан стін будівлі",
              }}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select labelId="typeAndCondition" variant="filled" {...field}>
                  {typeAndConditionOptions.map((option) => (
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
              {errors.typeAndCondition?.message || " "}
            </FormHelperText>
          </FormControl>
        </Stack>
      </InputsContainer>
      <Information>
        <Info2 />
      </Information>
    </Box>
  );
}
