"use client";

import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Hidden,
  MobileStepper,
  Step,
  StepButton,
  Stepper,
} from "@mui/material";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Step1 from "../components/steps/Step1";

const steps = ["Step 1", "Step 2", "Step 3", "Step 4"];

const FormSteps = ({ activeStep }) => {
  switch (activeStep) {
    case 0:
      return <Step1 />;
    case 1:
      return <></>;
    case 2:
      return <></>;
    case 3:
      return <></>;
  }
};

export default function Questionnarie() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const methods = useForm({ mode: "onChange" });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      handleSubmit(onSubmit)();
      isValid && setActiveStep((prew) => prew + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prew) => prew - 1);
    }
  };

  const handleStep = (step) => {
    setActiveStep(step);
  };

  return (
    <FormProvider {...methods}>
      <Box height="100%">
        <Hidden mdDown>
          <Box width="100%" mx={-1} pb={2}>
            <Stepper activeStep={activeStep}>
              {steps.map((step, index) => (
                <Step key={step}>
                  <StepButton onClick={() => handleStep(index)}>
                    {step}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Hidden>
        <Hidden mdUp>
          <Box pb={1}>
            <MobileStepper
              variant="progress"
              steps={steps.length}
              activeStep={activeStep}
              position="static"
              backButton={<Button onClick={handleBack}>Назад</Button>}
              nextButton={<Button onClick={handleNext}>Далі</Button>}
            />
          </Box>
        </Hidden>
        <Box
          sx={{
            [theme.breakpoints.up("md")]: { height: "496px" },
            [theme.breakpoints.down("md")]: { height: "523.5px" },
          }}
        >
          <FormSteps activeStep={activeStep} />
        </Box>
        <Hidden mdDown>
          <Box pt={2} display="flex" justifyContent="space-between">
            <Button size="small" variant="contained" onClick={handleBack}>
              Назад
            </Button>
            <Button size="small" variant="contained" onClick={handleNext}>
              Далі
            </Button>
          </Box>
        </Hidden>
      </Box>
    </FormProvider>
  );
}
