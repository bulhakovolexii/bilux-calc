import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Button, MobileStepper } from "@mui/material";
import { useEffect, useState } from "react";

export default function FormMobileStepper({
  steps,
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
    <MobileStepper
      variant="progress"
      steps={steps.length}
      activeStep={activeStep}
      position="static"
      sx={{ p: 0 }}
      backButton={
        <Button
          size="small"
          startIcon={<ChevronLeft />}
          onClick={handlePrevStep}
        >
          Назад
        </Button>
      }
      nextButton={
        <Button
          size="small"
          endIcon={<ChevronRight />}
          onClick={lastStep ? handleSubmit(onSubmit) : handleNextStep}
        >
          {lastStep ? "Результати" : "Далі"}
        </Button>
      }
    />
  );
}
