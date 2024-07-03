"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { useTheme } from "@emotion/react";
import { Box, Hidden, Stack } from "@mui/material";
import { useInputData } from "../context/InputDataContext";
import FormStepper from "../components/FormStepper";
import FormMobileStepper from "../components/FormMobileStepper";
import FormNavigationButton from "../components/FormNavigationButton";
import Building from "../model/Building";
import monthlyDurationIntervals from "../model/reference-data/monthlyDurationIntervals";

const steps = [
  {
    id: 0,
    label: "Локація",
    fields: ["city", "terrain"],
  },
  {
    id: 1,
    label: "Загальне",
    fields: [
      "purpose",
      "heatCapacityClass",
      "airPermeabilityClass",
      "constructionType",
    ],
  },
  {
    id: 2,
    label: "Геометрія",
    fields: [
      "buildingWidth",
      "buildingLength",
      "floorHeight",
      "numbersOfFloors",
    ],
  },
  {
    id: 3,
    label: "Підлога та дах",
    fields: ["ceiling.type", "ceiling.layers", "floor.type", "floor.layers"],
  },
  {
    id: 4,
    label: "Фасади",
    fields: [],
  },
  {
    id: 5,
    label: "Система",
    fields: [
      "system.heatGenerator",
      "system.type",
      "system.pipesInsulation",
      "system.temperatureGradient",
      "system.hydraulicAdjustment",
    ],
  },
  {
    id: 6,
    label: "Прилади",
    fields: [
      "system.heatGenerator",
      "system.type",
      "system.pipesInsulation",
      "system.temperatureGradient",
      "system.hydraulicAdjustment",
    ],
  },
];

export default function QuestionnaireLayout({ children }) {
  const router = useRouter();
  const theme = useTheme();
  const { inputData, updateInputData } = useInputData();
  const methods = useForm({ mode: "onChange", defaultValues: inputData });
  const {
    handleSubmit,
    trigger,
    watch,
    formState: { isValid },
  } = methods;
  const [activeStep, setActiveStep] = useState(0);

  const totalSteps = () => {
    return steps.length - 1;
  };

  const isLastStep = () => {
    return activeStep === totalSteps();
  };

  const isFirstStep = () => {
    return activeStep === 0;
  };

  const handleStep = (step) => {
    setActiveStep(step);
    router.push(`/questionnaire/step-${step + 1}`);
  };

  const handleNextStep = async () => {
    const stepIsValid = await trigger(steps[activeStep].fields, {
      shouldFocus: true,
    });

    if (!isLastStep() && stepIsValid) {
      handleStep(activeStep + 1);
    } else if (isLastStep() && isValid) {
      router.push("/results");
    }
  };

  const handlePrevStep = () => {
    if (!isFirstStep()) {
      handleStep(activeStep - 1);
    } else {
      router.push("/");
    }
  };

  const onSubmit = (data) => {
    if (isLastStep() && isValid) {
      try {
        const building = new Building(data);
        building.energyDemand(monthlyDurationIntervals[0]);
        updateInputData(data);
        handleNextStep();
      } catch (err) {
        alert(err);
        router.push("/questionnaire/step-3");
        setActiveStep(2);
      }
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Stack spacing={2} height="600px" py={1} justifyContent="space-between">
        <Hidden mdDown>
          <FormStepper
            steps={steps}
            activeStep={activeStep}
            handleStep={handleStep}
          />
        </Hidden>
        <Hidden mdUp>
          <FormMobileStepper
            steps={steps}
            activeStep={activeStep}
            isLastStep={isLastStep}
            handlePrevStep={handlePrevStep}
            handleNextStep={handleNextStep}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
        </Hidden>
        <Box
          sx={{
            position: "relative",
            [theme.breakpoints.up("md")]: { height: "496px" },
            [theme.breakpoints.down("md")]: {
              height: "537px",
            },
          }}
        >
          <FormProvider {...methods}>{children}</FormProvider>
        </Box>
        <Hidden mdDown>
          <FormNavigationButton
            activeStep={activeStep}
            isLastStep={isLastStep}
            handlePrevStep={handlePrevStep}
            handleNextStep={handleNextStep}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
        </Hidden>
      </Stack>
    </form>
  );
}
