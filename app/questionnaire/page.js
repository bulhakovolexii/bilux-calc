"use client";

import {
  Box,
  Button,
  Hidden,
  MobileStepper,
  Step,
  StepButton,
  Stepper,
} from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import Step1 from "../components/steps/Step1";
import Step2 from "../components/steps/Step2";
import Step3 from "../components/steps/Step3";

const steps = [
  { id: "step1", label: "Локація", fields: ["city", "terrain"] },
  {
    id: "step2",
    label: "Загальне",
    fields: ["purpose", "heatCapacityClass", "tightness", "typeAndCondition"],
  },
  {
    id: "step3",
    label: "Геомертрія",
    fields: [
      "buildingWidth",
      "buildingLength",
      "floorHeight",
      "numbersOfFloors",
    ],
  },
  {
    id: "step4",
    label: "Підлога та дах",
    fields: [],
  },
  {
    id: "step5",
    label: "Фасади",
    fields: [],
  },
  {
    id: "step6",
    label: "Step 6",
    fields: [],
  },
];

const FormSteps = ({ activeStep }) => {
  switch (activeStep) {
    case 0:
      return <Step1 />;
    case 1:
      return <Step2 />;
    case 2:
      return <Step3 />;
    case 3:
      return <></>;
  }
};

export default function Questionnarie() {
  const theme = useTheme();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const methods = useForm({
    mode: "onChange",
    // defaultValues: {
    //   city: "Харків",
    //   terrain: "B",
    //   purpose: "Багатоквартирні будинки, гуртожитки",
    //   heatCapacityClass: "Середній",
    //   tightness: "Герметична",
    //   typeAndCondition: "Утеплені органічними матеріалами в задовільному стані",
    //   buildingWidth: "44.295",
    //   buildingLenght: "14.495",
    //   floorHeight: "3",
    //   numbersOfFloors: "9",
    // },
  });

  const {
    handleSubmit,
    formState: { isValid },
    trigger,
  } = methods;

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleNext = async () => {
    const stepIsValid = await trigger(steps[activeStep].fields);
    if (activeStep < steps.length - 1 && stepIsValid) {
      setActiveStep((prew) => prew + 1);
    } else if (activeStep === steps.length - 1 && isValid) {
      handleSubmit(onSubmit)();
      router.push("/results");
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prew) => prew - 1);
    } else {
      router.push("/");
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
                <Step key={step.id}>
                  <StepButton onClick={() => handleStep(index)}>
                    {step.label}
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
              backButton={
                <Button
                  onClick={handleBack}
                  sx={{ minWidth: "7em", justifyContent: "start" }}
                  startIcon={<KeyboardArrowLeft />}
                >
                  Назад
                </Button>
              }
              nextButton={
                <Button
                  onClick={handleNext}
                  sx={{ minWidth: "7em", justifyContent: "end" }}
                  endIcon={<KeyboardArrowRight />}
                >
                  Далі
                </Button>
              }
            />
          </Box>
        </Hidden>
        <Box
          sx={{
            [theme.breakpoints.up("md")]: { height: "496px" },
            [theme.breakpoints.down("md")]: { height: "523.5px" },
          }}
        >
          <FormSteps activeStep={activeStep} handleNext={handleNext} />
        </Box>
        <Hidden mdDown>
          <Box pt={2} display="flex" justifyContent="space-between">
            <Button
              size="small"
              variant="contained"
              sx={{ minWidth: "7em" }}
              startIcon={<KeyboardArrowLeft />}
              onClick={handleBack}
            >
              Назад
            </Button>
            <Button
              size="small"
              variant="contained"
              sx={{ minWidth: "7em" }}
              endIcon={<KeyboardArrowRight />}
              onClick={handleNext}
            >
              Далі
            </Button>
          </Box>
        </Hidden>
      </Box>
    </FormProvider>
  );
}
