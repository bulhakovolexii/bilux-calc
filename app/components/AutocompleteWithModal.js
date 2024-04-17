"use client";

import { Add, Edit } from "@mui/icons-material";
import {
  Autocomplete,
  Chip,
  Dialog,
  DialogTitle,
  TextField,
} from "@mui/material";
import { cloneElement, useState } from "react";
import { Controller, get, useFormContext } from "react-hook-form";
import theme from "../theme";

export default function AutocompleteWithModal({
  name,
  label,
  children,
  optionPrefix,
  addTitlePrefix,
  editTitlePrefix,
}) {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useFormContext();
  const [open, setOpen] = useState(false);
  const [editOption, setEditOption] = useState(null);

  const error = get(errors, name);

  const options = () => watch(name) || [];

  const editOptionNumber = () => options().indexOf(editOption) + 1;

  const handleOpen = () => {
    if (!options().length) {
      setOpen(true);
    } else {
      setOpen(true);
      setEditOption(null);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(
      () => setEditOption(null),
      theme.transitions.duration.leavingScreen
    );
  };

  const handleSubmitOption = async (newOption) => {
    if (editOption) {
      const updatedOptions = options().map((option) =>
        option.id === editOption.id ? { ...newOption, id: option.id } : option
      );
      setValue(name, updatedOptions);
      handleClose();
    } else {
      const currentOptions = options();
      if (currentOptions?.length > 0) {
        const maxId = Math.max(...currentOptions.map((option) => option.id));
        const updatedOption = [
          ...currentOptions,
          { ...newOption, id: maxId + 1 },
        ];
        setValue(name, updatedOption);
        handleClose();
      } else {
        setValue(name, [{ ...newOption, id: 1 }]);
        handleClose();
      }
    }
    await trigger(name);
  };

  const handleDeleteOption = async (deletedOption) => {
    const updatedOption = options().filter(
      (option) => option.id !== deletedOption.id
    );
    setValue(name, updatedOption);
    await trigger(name);
  };

  const handleEditOption = (option) => {
    setEditOption(option);
    setOpen(true);
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
            value={options() || []}
            open={open}
            onOpen={handleOpen}
            PopperComponent={() => <></>}
            popupIcon={<Add />}
            openText="Додати"
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  {...getTagProps({ index })}
                  size="small"
                  color="secondary"
                  icon={<Edit />}
                  key={option.id}
                  label={optionPrefix + (index + 1)}
                  onDelete={() => handleDeleteOption(option)}
                  onClick={() => handleEditOption(option)}
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
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>
          {editOption
            ? editTitlePrefix + editOptionNumber()
            : addTitlePrefix + (options().length + 1)}
        </DialogTitle>
        {cloneElement(children, {
          onSubmit: handleSubmitOption,
          handleClose: handleClose,
          initialValues: editOption,
        })}
      </Dialog>
    </>
  );
}
