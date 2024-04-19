"use client";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  DialogActions,
  DialogContent,
  FormControl,
  FormHelperText,
  FormLabel,
  InputAdornment,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import materials from "../model/reference-data/metrials";
import { Check, ExpandMore } from "@mui/icons-material";

export default function LayerForm({ onSubmit, initialValues, handleClose }) {
  const {
    control,
    formState: { errors },
    handleSubmit,
    trigger,
  } = useForm({
    mode: "onChange",
    defaultValues: initialValues,
  });

  const groupedMaterials = {};

  materials.forEach((material) => {
    if (!groupedMaterials[material.type]) {
      groupedMaterials[material.type] = {};
    }
    if (!groupedMaterials[material.type][material.subtype]) {
      groupedMaterials[material.type][material.subtype] = [];
    }
    groupedMaterials[material.type][material.subtype].push(material);
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={1}>
            <Controller
              name="thickness"
              control={control}
              defaultValue=""
              rules={{
                required: "Введіть товщину шару",
                min: {
                  value: "1",
                  message: "Товщина повинна бути більше нуля",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Товщина шару"
                  variant="filled"
                  type="number"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">мм</InputAdornment>
                    ),
                  }}
                  inputProps={{
                    step: "1",
                    min: "1",
                  }}
                  error={!!errors.thickness}
                  helperText={errors.thickness?.message || " "}
                />
              )}
            />

            <Controller
              name="material"
              control={control}
              defaultValue=""
              rules={{ required: "Оберіть матеріал" }}
              render={({ field }) => (
                <FormControl error={!!errors?.material}>
                  <FormLabel>Матеріал</FormLabel>
                  {Object.entries(groupedMaterials).map(([type, subtypes]) => (
                    <Accordion
                      variant="outlined"
                      key={type}
                      defaultExpanded={field.value.type === type}
                    >
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        {type}
                      </AccordionSummary>
                      <AccordionDetails>
                        {Object.entries(subtypes).map(
                          ([subtype, materials]) => (
                            <Accordion
                              variant="outlined"
                              key={subtype}
                              defaultExpanded={field.value.subtype === subtype}
                            >
                              <AccordionSummary expandIcon={<ExpandMore />}>
                                {subtype}
                              </AccordionSummary>
                              <AccordionDetails>
                                {materials.map((material) => (
                                  <Accordion
                                    variant="outlined"
                                    key={material.name}
                                    defaultExpanded={
                                      field.value.name == material.name
                                    }
                                  >
                                    <AccordionSummary
                                      expandIcon={<ExpandMore />}
                                    >
                                      {material.name}
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      {material.variants.map((variant) => (
                                        <ListItemButton
                                          key={
                                            variant.density +
                                            variant.conductivity
                                          }
                                          selected={
                                            field.value.density ===
                                            variant.density
                                          }
                                          onClick={async () => {
                                            field.onChange({
                                              type: type,
                                              subtype: subtype,
                                              name: material.name,
                                              density: variant.density,
                                            });
                                            if (await trigger("material")) {
                                              handleSubmit(onSubmit)();
                                            }
                                          }}
                                        >
                                          <Stack direction="row" spacing={1}>
                                            <ListItemText
                                              primary={`густина – ${variant.density}, кг/м³; теплопровідність – ${variant.conductivity}, Вт/(м∙К)`}
                                            />
                                            {field?.value?.density ===
                                              variant.density && (
                                              <Check color="primary" />
                                            )}
                                          </Stack>
                                        </ListItemButton>
                                      ))}
                                    </AccordionDetails>
                                  </Accordion>
                                ))}
                              </AccordionDetails>
                            </Accordion>
                          )
                        )}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                  <FormHelperText>
                    {errors?.material?.message || " "}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Відмінити</Button>
          <Button type="submit">{initialValues ? "Зберегти" : "Додати"}</Button>
        </DialogActions>
      </form>
    </>
  );
}
