"use client";

import { Add } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";

export default function AutocompleteWithModal() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);

  const handleClickOpen = () => {
    // Добавляем пустой объект в опции и открываем модальное окно
    setOptions([
      ...options,
      { id: Math.random(), name: "Option 1", value: "1" },
    ]);
    setOpen(true);
  };

  const handleClose = () => {
    // Удаляем последний добавленный объект, если он не заполнен
    if (options.length > 0 && !options[options.length - 1].name) {
      setOptions(options.slice(0, -1));
    }
    setOpen(false);
  };

  const onSubmit = (data) => {
    // Обновляем последний объект в опциях с данными из формы
    handleClose();
  };

  const handleDelete = (chipToDelete) => () => {
    setOptions((chips) => chips.filter((chip) => chip.id !== chipToDelete.id));
  };

  return (
    <>
      <Stack direction="row" spacing={1}>
        <Autocomplete
          multiple
          fullWidth
          options={options}
          disableClearable
          noOptionsText="Немає шарів"
          getOptionLabel={(option) => option.name}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                size="small"
                color="secondary"
                key={option.id}
                label={option.name}
                {...getTagProps({ index })}
                // onDelete={handleDelete}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="Шари конструкції"
              placeholder={"Оберіть або додайте шар"}
              InputProps={{
                ...params.InputProps,
                onKeyDown: (e) => e.preventDefault(),
                sx: {
                  caretColor: "transparent",
                  cursor: "pointer",
                  input: { cursor: "pointer" },
                },
              }}
            />
          )}
        />
        <Button variant="outlined" onClick={handleClickOpen}>
          <Add />
        </Button>
      </Stack>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Добавить опцию</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={onSubmit}>Добавить</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
