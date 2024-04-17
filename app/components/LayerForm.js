"use client";

import { Button, DialogActions, DialogContent, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

export default function LayerForm({ onSubmit, initialValues, handleClose }) {
  const { register, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: initialValues,
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {/* Form fields for new option */}
          <TextField {...register("name")} label="Name" />
          {/* ... other fields ... */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Відмінити</Button>
          <Button type="submit">{initialValues ? "Зберегти" : "Додати"}</Button>
        </DialogActions>
      </form>
    </>
  );
}
