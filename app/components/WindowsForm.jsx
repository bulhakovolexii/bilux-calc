"use client";

import {
  Alert,
  AlertTitle,
  Autocomplete,
  Button,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import windows from "../model/reference-data/windows";

export default function WindowsForm({ handleClose, onSubmit, initialValue }) {
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
                rule="Введіть ширину вікна"
                minValue={0.01}
                step={0.01}
                error="Ширина повинна бути більше нуля"
                dimension="м"
                label="Ширина"
              />
              <NumberInput
                name="height"
                rule="Введіть висоту вікна"
                minValue={0.01}
                step={0.01}
                error="Висота повинна бути більше нуля"
                dimension="м"
                label="Висота"
              />
              <NumberInput
                name="quantity"
                rule="Введіть кількість вікон"
                minValue={1}
                step={1}
                error="Кількість повинна бути більше нуля"
                dimension="шт"
                label="Кількість"
              />
            </Stack>
            <Controller
              name="type"
              control={control}
              rules={{
                required: "Оберіть тип склопакета",
              }}
              render={({ field, fieldState: { error } }) => {
                const { onChange, value, ref } = field;
                return (
                  <Autocomplete
                    disableClearable
                    options={windows}
                    getOptionLabel={(option) =>
                      `${option.variant} – (Повітря: ${option.air}%, Криптон: ${option.krypton}%, Аргон: ${option.argon}%), опір теплопередачі: ${option.thermalResistance}, м²·К/Вт`
                    }
                    value={value}
                    onChange={(event, newValue) => {
                      onChange(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Варіант склопакета"
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
            <Alert variant="outlined" severity="info">
              <AlertTitle>Позначення скла</AlertTitle>
              4М₁ — листове стандартне, К — енергозберігаюче зтвердим покриттям,
              i — енергозберігаюче з мʼяким покриттям.
            </Alert>
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
