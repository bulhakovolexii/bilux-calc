"use client";

import { useFormData } from "@/contexts/FormDataContext";
import {
  Box,
  Button,
  Step,
  StepButton,
  StepLabel,
  Stepper,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navigation({ children }) {
  const steps = ["Step 1", "Step 2", "Step 3"];
  const router = useRouter();
  const { formData, activeStep, setActiveStep } = useFormData();
  const [stepsDisabled, setStepsDisabled] = useState(
    steps.map((_, index) => (index === 0 ? false : true))
  );

  useEffect(() => {
    setStepsDisabled(steps.map((_, index) => isStepDisabled(index)));
  }, [formData]);

  const isStepDisabled = (step) => {
    switch (step) {
      case 0:
        return false;
      case 1:
        return formData.step2 ? false : true;
      case 2:
        return formData.step3 ? false : true;
    }
  };

  const totalSteps = () => {
    return steps.length;
  };

  const isFirstStep = () => {
    return activeStep === 0;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    if (isLastStep()) {
      router.push("/results");
    } else {
      setActiveStep((prewActiveStep) => prewActiveStep + 1);
      router.push(`/step-${activeStep + 2}`);
    }
  };

  const handleBack = () => {
    if (isFirstStep()) {
      router.push("/");
    } else {
      setActiveStep((prewActiveStep) => prewActiveStep - 1);
      router.push(`/step-${activeStep}`);
    }
  };

  const handleStep = (step) => {
    setActiveStep(step);
    router.push(`/step-${step + 1}`);
  };

  return (
    <Box display="flex" flexDirection="column" height="100%" pt={1} pb={1}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={label} disabled={stepsDisabled[index]}>
              <StepButton onClick={() => handleStep(index)}>
                <StepLabel>{label}</StepLabel>
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
      <Box flexGrow="1">{children}</Box>
      <Box display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          sx={{ minWidth: "7em" }}
          onClick={handleBack}
        >
          Назад
        </Button>
        <Button
          variant="contained"
          sx={{ minWidth: "7em" }}
          onClick={handleNext}
          disabled={stepsDisabled[activeStep + 1]}
        >
          Вперед
        </Button>
      </Box>
    </Box>
  );
}
