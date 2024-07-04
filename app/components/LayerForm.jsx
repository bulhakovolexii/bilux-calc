"use client";

import {
  Button,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

export default function LayerForm({ handleClose, onSubmit, initialValue }) {
  const { control, handleSubmit, getValues } = useForm({
    mode: "onChange",
    defaultValues: { ...initialValue },
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ maxHeight: "calc(100vh - 192px)" }}>
          <Stack spacing={1} sx={{ overflowY: "auto" }}>
            <Controller
              name="thickness"
              control={control}
              rules={{
                required: "Введіть товщину шару",
                min: {
                  value: "0.1",
                  message: "Товщина повинна бути більше нуля",
                },
              }}
              render={({ field, fieldState: { error } }) => {
                const { onChange, value, ref } = field;
                return (
                  <TextField
                    type="number"
                    value={value || ""}
                    onChange={(e) => onChange(e.target.value)}
                    inputRef={ref}
                    inputProps={{ inputMode: "numeric", min: 1, step: 1 }}
                    InputProps={{ endAdornment: "мм", sx: { gap: 1 } }}
                    variant="filled"
                    label="Товщина"
                    error={!!error}
                    helperText={error?.message || " "}
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
