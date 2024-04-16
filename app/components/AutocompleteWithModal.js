"use client";

import { Add } from "@mui/icons-material";
import { Autocomplete, Chip, Dialog, TextField } from "@mui/material";
import { useState } from "react";
import { Controller, get, useFormContext } from "react-hook-form";

export default function AutocompleteWithModal({
  name,
  label,
  children,
  optionLabel,
}) {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const error = get(errors, name);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteChip = (deletedValue) => {
    const updatedValue = watch(name).filter(
      (option) => option.id !== deletedValue.id
    );
    setValue(name, updatedValue);
  };

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            multiple
            disableClearable
            fullWidth
            options={[]}
            value={watch(name)}
            open={open}
            onOpen={handleOpen}
            PopperComponent={() => <></>}
            popupIcon={<Add />}
            openText="Додати"
            renderTags={(value) =>
              value.map((option, index) => (
                <Chip
                  className="MuiAutocomplete-tag"
                  size="small"
                  color="secondary"
                  key={option.id}
                  label={`${optionLabel} ${index + 1}`}
                  onDelete={() => handleDeleteChip(option)}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                label={label}
                error={!!error}
                helperText={error?.message || " "}
                InputProps={{
                  ...params.InputProps,
                  sx: {
                    cursor: "pointer",
                    input: { cursor: "pointer", caretColor: "transparent" },
                  },
                }}
              />
            )}
          />
        )}
      />
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={false}>
        {children}
      </Dialog>
    </>
  );
}
