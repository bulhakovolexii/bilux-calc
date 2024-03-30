"use client";

import MyMobileStepper from "@/components/MyMobileStepper";
import MyStepper from "@/components/MyStepper";
import NavButtons from "@/components/NavButtons";
import { useFormData } from "@/contexts/FormDataContext";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function StepsLayout({ children }) {
  const steps = [
    "Локація",
    "Загальне",
    "Геометрія",
    "Підлога та дах",
    "Фасади",
    "Step 6",
  ];

  const router = useRouter();
  const [formData] = useFormData();
  const [activeStep, setActiveStep] = useState(0);
  const [stepsAvalible, setStepsAvalible] = useState(
    steps.map((_, index) => (index === 0 ? true : false))
  );

  useEffect(() => {
    setStepsAvalible(steps.map((_, index) => isStepAvalible(index)));
  }, [formData]);

  const isStepAvalible = (step) => {
    switch (step) {
      case 0:
        return true;
      case 1:
        return true;
      case 2:
        return true;
      case 3:
        return false;
      case 4:
        return false;
      case 5:
        return false;
    }
  };

  const handleNext = () => {
    const nextStep = activeStep + 1;
    if (activeStep === steps.length - 1) {
      router.push("/results");
    } else {
      setActiveStep(nextStep);
      router.push(`/steps/step-${nextStep + 1}`);
    }
  };

  const handleBack = () => {
    const previousStep = activeStep - 1;
    if (activeStep === 0) {
      router.push("/");
    } else {
      setActiveStep(previousStep);
      router.push(`/steps/step-${previousStep + 1}`);
    }
  };

  const handleStep = (step) => {
    setActiveStep(step);
    router.push(`/steps/step-${step + 1}`);
  };
  return (
    <Box
      sx={{
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <MyStepper
        steps={steps}
        activeStep={activeStep}
        handleStep={handleStep}
        stepsAvalible={stepsAvalible}
      />
      <MyMobileStepper
        steps={steps}
        activeStep={activeStep}
        handleBack={handleBack}
        handleNext={handleNext}
        stepsAvalible={stepsAvalible}
      />
      <Box sx={{ flexGrow: 1, display: "flex", gap: 4 }}>{children}</Box>
      <NavButtons
        activeStep={activeStep}
        stepsAvalible={stepsAvalible}
        handleBack={handleBack}
        handleNext={handleNext}
      />
    </Box>
  );
}
