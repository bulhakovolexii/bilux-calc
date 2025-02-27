"use client";

import {
  Autocomplete,
  Button,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import doors from "@/model/reference-data/doors";

export default function DoorsForm({ handleClose, onSubmit, initialValue }) {
  const { control, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: { ...initialValue },
  });

  const NumberInput = ({
    name,
    rule,
    minValue,
    step,
    error,
    dimension,
    label,
  }) => {
    return (
      <Controller
        name={name}
        control={control}
        rules={{
          required: rule,
          min: {
            value: minValue,
            message: error,
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
              inputProps={{ inputMode: "numeric", min: minValue, step: step }}
              InputProps={{ endAdornment: dimension, sx: { gap: 1 } }}
              variant="filled"
              label={label}
              error={!!error}
              helperText={error?.message || " "}
            />
          );
        }}
      />
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ maxHeight: "calc(100vh - 192px)" }}>
          <Stack spacing={1} sx={{ overflowY: "auto" }}>
            <Stack spacing={1} direction="row">
              <NumberInput
                name="width"
                rule="Введіть ширину дверей"
                minValue={0.01}
                step={0.01}
                error="Ширина повинна бути більше нуля"
                dimension="м"
                label="Ширина"
              />
              <NumberInput
                name="height"
                rule="Введіть висоту дверей"
                minValue={0.01}
                step={0.01}
                error="Висота повинна бути більше нуля"
                dimension="м"
                label="Висота"
              />
              <NumberInput
                name="quantity"
                rule="Введіть кількість дверей"
                minValue={1}
                step={1}
                error="Кількість повинна бути більше нуля"
                dimension="шт"
                label="Кількість"
              />
            </Stack>
            <Controller
              name="variant"
              control={control}
              rules={{
                required: "Оберіть тип дверей",
              }}
              render={({ field, fieldState: { error } }) => {
                const { onChange, value, ref } = field;
                return (
                  <Autocomplete
                    disableClearable
                    options={doors}
                    getOptionLabel={(option) =>
                      `${option.variant}, опір теплопередачі: ${option.thermalResistance}, м²·К/Вт`
                    }
                    value={doors.find((door) => door.variant === value)}
                    onChange={(event, newValue) => {
                      onChange(newValue.variant);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Тип дверей"
                        variant="filled"
                        inputRef={ref}
                        error={!!error}
                        helperText={error?.message || " "}
                        inputProps={{ ...params.inputProps, readOnly: true }}
                        InputProps={{
                          ...params.InputProps,
                          sx: {
                            cursor: "pointer",
                            input: { cursor: "pointer" },
                          },
                        }}
                      />
                    )}
                  />
                );
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Відмінити</Button>
          <Button type="submit">{initialValue ? "Зберегти" : "Додати"}</Button>
        </DialogActions>
      </form>
    </>
  );
}
