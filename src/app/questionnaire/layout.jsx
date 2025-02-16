"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { useTheme } from "@emotion/react";
import { Box, Hidden, Stack, Container } from "@mui/material";
import { useInputData } from "@/context/InputDataContext";
import FormStepper from "@/components/FormStepper";
import FormMobileStepper from "@/components/FormMobileStepper";
import FormNavigationButton from "@/components/FormNavigationButton";
import Building from "@/model/Building";
import monthlyDurationIntervals from "@/model/reference-data/monthlyDurationIntervals";
import CustomAppBar from "@/components/MyAppBar";
import useUnsavedChanges from "@/hooks/useUnsavedChanges";

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
      "numberOfFloors",
    ],
  },
  {
    id: 3,
    label: "Підлога та дах",
    fields: [
      "ceiling.type",
      "ceiling.layers",
      "floor.type",
      "floor.layers",
      "floor.wallHeight",
    ],
  },
  {
    id: 4,
    label: "Фасади",
    fields: [
      "facades[0].layers",
      "facades[1].layers",
      "facades[2].layers",
      "facades[3].layers",
    ],
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
  useUnsavedChanges();
  const router = useRouter();
  const params = useParams();
  const theme = useTheme();
  const { inputData, updateInputData } = useInputData();
  const methods = useForm({ mode: "onChange", defaultValues: inputData });
  const {
    handleSubmit,
    trigger,
    getValues,
    formState: { isValid },
  } = methods;
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setActiveStep(parseInt(params.step.split("-")[1]) - 1);
  }, [params]);

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
    router.push(`/questionnaire/step-${step + 1}`);
    updateInputData(getValues());
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
      }
    }
  };

  return (
    <>
      <CustomAppBar color="secondary" />
      <Container
        maxWidth="lg"
        sx={{
          mt: { md: 2 },
          bgcolor: "rgba(255,255,255,0.8)",
          borderRadius: 1,
        }}
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            spacing={2}
            height="600px"
            py={1}
            justifyContent="space-between"
          >
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
      </Container>
    </>
  );
}
