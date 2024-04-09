import {
  Box,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Information from "../Information";
import InputsContainer from "../InputsContainer";
import { Controller, useFormContext } from "react-hook-form";

const Info3 = () => {
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

export default function Step3() {
  const {
    formState: { errors },
    control,
  } = useFormContext();

  return (
    <Box height="100%" display="flex" gap={3}>
      <InputsContainer>
        <Stack spacing={2}>
          <Typography variant="h4">Базова геометрія будівлі</Typography>
          <Controller
            name="buildingWidth"
            control={control}
            defaultValue=""
            rules={{
              required: "Введіть ширину будівлі",
              min: {
                value: "0.01",
                message: "Ширина повинна бути більше нуля",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Ширина"
                variant="filled"
                type="number"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">м</InputAdornment>
                  ),
                }}
                inputProps={{
                  step: "0.01",
                  min: "0.01",
                }}
                error={!!errors.buildingWidth}
                helperText={
                  errors.buildingWidth?.message ||
                  "Проекція північного/південного фасаду"
                }
              />
            )}
          />

          <Controller
            name="buildingLength"
            control={control}
            defaultValue=""
            rules={{
              required: "Введіть довжину будівлі",
              min: {
                value: "0.01",
                message: "Довжина повинна бути більше нуля",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Довжина"
                variant="filled"
                type="number"
                inputProps={{
                  step: "0.01",
                  min: "0.01",
                }}
                error={!!errors.buildingLength}
                helperText={
                  errors.buildingLength?.message ||
                  "Проекція східного/західного фасаду"
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">м</InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Stack direction="row" spacing={2}>
            <Controller
              name="floorHeight"
              control={control}
              defaultValue=""
              rules={{
                required: "Введіть висоту поверху",
                min: {
                  value: "0.01",
                  message: "Висота поверху повинна бути більше нуля",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Висота поверху"
                  variant="filled"
                  type="number"
                  inputProps={{
                    step: "0.01",
                    min: "0.01",
                  }}
                  error={!!errors.floorHeight}
                  helperText={
                    errors.floorHeight?.message ||
                    "Без врахування підвалу та горища"
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">м</InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Controller
              name="numbersOfFloors"
              control={control}
              defaultValue=""
              rules={{
                required: "Введіть кількість поверхів",
                min: {
                  value: "1",
                  message: "Кількість поверхів повинна бути більше нуля",
                },
                validate: (value) =>
                  Number.isInteger(parseFloat(value)) || "Введіть ціле число",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Кількість поверхів"
                  variant="filled"
                  type="number"
                  inputProps={{
                    inputMode: "numeric",
                    step: "1",
                    min: "1",
                  }}
                  error={!!errors.numbersOfFloors}
                  helperText={errors.numbersOfFloors?.message || " "}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Stack>
        </Stack>
      </InputsContainer>
      <Information>
        <Info3 />
      </Information>
    </Box>
  );
}
