"use client";

import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";

export default function FormNavigationButton({
  activeStep,
  isLastStep,
  handlePrevStep,
  handleNextStep,
  handleSubmit,
  onSubmit,
}) {
  const [lastStep, setLastStep] = useState(false);

  useEffect(() => {
    if (isLastStep()) {
      setLastStep(true);
    } else {
      setLastStep(false);
    }
  }, [activeStep]);

  return (
    <Stack direction="row" justifyContent="space-between">
      <Button
        size="small"
        variant="contained"
        startIcon={<ChevronLeft />}
        sx={{ minWidth: "7em", justifyContent: "start" }}
        onClick={handlePrevStep}
      >
        Назад
      </Button>
      <Button
        size="small"
        variant="contained"
        endIcon={<ChevronRight />}
        sx={{ minWidth: "7em", justifyContent: "end" }}
        onClick={lastStep ? handleSubmit(onSubmit) : handleNextStep}
      >
        {lastStep ? "Результати" : "Далі"}
      </Button>
    </Stack>
  );
}
