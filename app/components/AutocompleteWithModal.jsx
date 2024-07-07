import { Add, ContentCopy, ContentPaste, Edit } from "@mui/icons-material";
import {
  Autocomplete,
  Chip,
  Dialog,
  DialogTitle,
  TextField,
  ButtonGroup,
  Button,
  Stack,
  Tooltip,
} from "@mui/material";
import { cloneElement, useState } from "react";
import { Controller } from "react-hook-form";

export default function AutocompleteWithModal({
  children,
  name,
  rules,
  optionPrefix,
  editTitlePrefix,
  addTitlePrefix,
  label,
  control,
  handleCopy,
  handlePaste,
}) {
  const [open, setOpen] = useState(false);
  const [editedOption, setEditedOption] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleExited = () => {
    setEditedOption(null);
  };

  const editOption = (value, id) => {
    const option = value.find((option) => option.id === id);
    setEditedOption(option);
    setOpen(true);
  };

  const onSubmit = (newValue, value, onChange) => {
    if (editedOption) {
      const updatedOptions = value.map((option) =>
        option.id === editedOption.id ? { ...newValue, id: option.id } : option
      );
      onChange(updatedOptions);
      handleClose();
    } else {
      const currentOptions = value;
      if (currentOptions?.length > 0) {
        const maxId = Math.max(...currentOptions.map((option) => option.id));
        const updatedOption = [
          ...currentOptions,
          { ...newValue, id: maxId + 1 },
        ];
        onChange(updatedOption);
        handleClose();
      } else {
        onChange([{ ...newValue, id: 1 }]);
        handleClose();
      }
    }
  };

  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={[]}
        rules={rules}
        render={({ field, fieldState: { error } }) => {
          const { onChange, value, ref } = field;
          return (
            <>
              <Autocomplete
                multiple
                disableClearable
                options={[]}
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue ? newValue : null);
                }}
                PopperComponent={() => <></>}
                popupIcon={<Add />}
                openText="Додати"
                open={open}
                onOpen={handleOpen}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      size="small"
                      color="secondary"
                      icon={<Edit />}
                      key={option.id}
                      label={optionPrefix + (index + 1)}
                      onClick={() => editOption(value, option.id)}
                    />
                  ))
                }
                renderInput={(params) => (
                  <Stack direction="row" gap={1}>
                    <TextField
                      {...params}
                      label={label}
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
                    {handleCopy && (
                      <ButtonGroup>
                        <Tooltip title="Копіювати">
                          <Button
                            size="small"
                            sx={{ mb: "23px" }}
                            onClick={() => handleCopy(name)}
                          >
                            <ContentCopy />
                          </Button>
                        </Tooltip>
                        <Tooltip title="Вставити">
                          <Button
                            size="small"
                            sx={{ mb: "23px" }}
                            onClick={() => {
                              handlePaste(name);
                            }}
                          >
                            <ContentPaste />
                          </Button>
                        </Tooltip>
                      </ButtonGroup>
                    )}
                  </Stack>
                )}
              />
              <Dialog
                open={open}
                onClose={handleClose}
                TransitionProps={{ onExited: handleExited }}
                fullWidth
                maxWidth="md"
              >
                <DialogTitle>
                  {editedOption
                    ? editTitlePrefix + (value.indexOf(editedOption) + 1)
                    : addTitlePrefix + (value.length + 1)}
                </DialogTitle>
                {cloneElement(children, {
                  handleClose,
                  initialValue: editedOption,
                  onSubmit: (newValue) => onSubmit(newValue, value, onChange),
                })}
              </Dialog>
            </>
          );
        }}
      />
    </>
  );
}
