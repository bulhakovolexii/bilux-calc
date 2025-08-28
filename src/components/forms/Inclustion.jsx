"use client";

import {
  Button,
  DialogActions,
  DialogContent,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import environmentTypes from "@/model/reference-data/environmentTypes";
import AutocompleteWithModal from "@/components/forms/AutocompleteWithModal";
import LayerForm from "@/components/forms/Layer";
import WindowsForm from "@/components/forms/Windows";
import DoorsForm from "@/components/forms/Doors";
import DimensionsField from "./InclusionDimensionFlied";

export default function InclusionForm({
  handleClose,
  onSubmit,
  initialValue,
  copiedData,
  setCopiedData,
}) {
  const { control, handleSubmit, getValues, setValue, clearErrors } = useForm({
    mode: "onChange",
    defaultValues: { ...initialValue },
  });

  const handleCopy = (name, type) => {
    const newCopiedData = { type: type, value: getValues(name) };
    setCopiedData(newCopiedData);
  };

  const handlePaste = (name) => {
    setValue(name, copiedData.value);
    clearErrors(name);
  };

  return (
    <>
      <DialogContent sx={{ maxHeight: "calc(100vh - 192px)" }}>
        <Stack spacing={1} sx={{ overflowY: "auto" }}>
          <Controller
            name="environment"
            control={control}
            rules={{
              required: "Оберіть навколишнє середовище",
            }}
            render={({ field, fieldState: { error } }) => {
              const { onChange, value, ref } = field;
              return (
                <FormControl error={!!error} variant="filled">
                  <InputLabel>Навколишнє середовище</InputLabel>
                  <Select
                    value={value || ""}
                    onChange={(event) => onChange(event.target.value)}
                    inputRef={ref}
                  >
                    {environmentTypes.map(({ type }) => (
                      <MenuItem
                        key={type}
                        value={type}
                        sx={{ whiteSpace: "normal" }}
                      >
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{error?.message || " "}</FormHelperText>
                </FormControl>
              );
            }}
          />
          <Stack spacing={1} direction="row">
            <DimensionsField
              name="width"
              rule="Введіть ширину вікна"
              minValue={0.01}
              step={0.01}
              error="Ширина повинна бути більше нуля"
              dimension="м"
              label="Ширина"
              control={control}
            />
            <DimensionsField
              name="height"
              rule="Введіть висоту вікна"
              minValue={0.01}
              step={0.01}
              error="Висота повинна бути більше нуля"
              dimension="м"
              label="Висота"
              control={control}
            />
          </Stack>
          <AutocompleteWithModal
            type="layer"
            handleCopy={handleCopy}
            handlePaste={handlePaste}
            copiedData={copiedData}
            name="layers"
            control={control}
            rules={{
              validate: (value) =>
                value.length > 0 || `Додайте хоча б один шар`,
            }}
            label="Шари конструкції"
            optionPrefix="Шар №"
            addTitlePrefix="Додати шар №"
            editTitlePrefix="Редагувати шар №"
          >
            <LayerForm />
          </AutocompleteWithModal>
          <AutocompleteWithModal
            type="window"
            handleCopy={handleCopy}
            handlePaste={handlePaste}
            copiedData={copiedData}
            name="windows"
            control={control}
            label="Вікна"
            optionPrefix="Вікно ВК-"
            addTitlePrefix="Додати вікно вк-"
            editTitlePrefix="Редагувати вікно вк-"
          >
            <WindowsForm />
          </AutocompleteWithModal>
          <AutocompleteWithModal
            type="door"
            handleCopy={handleCopy}
            handlePaste={handlePaste}
            copiedData={copiedData}
            name="dors"
            control={control}
            label="Двері"
            optionPrefix="Двері Д-"
            addTitlePrefix="Додати двері Д-"
            editTitlePrefix="Редагувати двері Д-"
          >
            <DoorsForm />
          </AutocompleteWithModal>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Відмінити</Button>
        <Button onClick={handleSubmit(onSubmit)}>
          {initialValue ? "Зберегти" : "Додати"}
        </Button>
      </DialogActions>
    </>
  );
}
