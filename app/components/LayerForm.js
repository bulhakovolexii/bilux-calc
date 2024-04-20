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
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import materials from "../model/reference-data/metrials";
import { Check, ExpandMore } from "@mui/icons-material";
import { useState } from "react";

export default function LayerForm({ onSubmit, initialValues, handleClose }) {
  const {
    control,
    formState: { errors },
    handleSubmit,
    trigger,
    getValues,
  } = useForm({
    mode: "onChange",
    defaultValues: initialValues,
  });

  const [openAccordionType, setOpenAccordionType] = useState(
    getValues("material.type") || null
  );

  const [openAccordionSubtype, setOpenAccordionSubtype] = useState(
    getValues("material.subtype") || null
  );

  const [openAccordionMaterial, setOpenAccordionMaterial] = useState(
    getValues("material.name") || null
  );

  const handleAccordionTypeChange = (panel) => (event, isExpanded) => {
    setOpenAccordionType(isExpanded ? panel : null);
  };

  const handleAccordionSubtypeChange = (panel) => (event, isExpanded) => {
    setOpenAccordionSubtype(isExpanded ? panel : null);
  };

  const handleAccordionMaterialChange = (panel) => (event, isExpanded) => {
    setOpenAccordionMaterial(isExpanded ? panel : null);
  };

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
        <DialogContent sx={{ maxHeight: "calc(100vh - 192px)" }}>
          <Stack spacing={1} sx={{ overflowY: "auto" }}>
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
                      expanded={openAccordionType === type}
                      onChange={handleAccordionTypeChange(type)}
                    >
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography>{type}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {Object.entries(subtypes).map(
                          ([subtype, materials]) => (
                            <Accordion
                              variant="outlined"
                              key={subtype}
                              expanded={openAccordionSubtype === subtype}
                              onChange={handleAccordionSubtypeChange(subtype)}
                            >
                              <AccordionSummary expandIcon={<ExpandMore />}>
                                <Typography>{subtype}</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                {materials.map((material) => (
                                  <Accordion
                                    variant="outlined"
                                    key={material.name}
                                    expanded={
                                      openAccordionMaterial === material.name
                                    }
                                    onChange={handleAccordionMaterialChange(
                                      material.name
                                    )}
                                  >
                                    <AccordionSummary
                                      expandIcon={<ExpandMore />}
                                    >
                                      <Typography>{material.name}</Typography>
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
