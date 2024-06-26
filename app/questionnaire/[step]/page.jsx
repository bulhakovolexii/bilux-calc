"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { Box, Slide } from "@mui/material";
import FormInputs from "@/app/components/FormInputs";
import FormInformation from "@/app/components/FormInformation";
import Step1 from "@/app/components/steps/Step1";
import Step2 from "@/app/components/steps/Step2";
import Step3 from "@/app/components/steps/Step3";
import Step4 from "@/app/components/steps/Step4";

const Step = (stepNumber) => {
  switch (stepNumber) {
    case 1:
      return <Step1 />;
    case 2:
      return <Step2 />;
    case 3:
      return <Step3 />;
    case 4:
      return <Step4 />;
    default:
      return <>Step component not found</>;
  }
};

const Info = (stepNumber) => {
  switch (stepNumber) {
    default:
      return <>Info component not found</>;
  }
};

export default function ({ params: { step } }) {
  const router = useRouter();
  const stepNumber = parseInt(step.split("-")[1]);
  const { getValues } = useFormContext();

  const values = getValues();

  useEffect(() => {
    if (stepNumber > 1 && Object.keys(values).length < 1) {
      router.push("/questionnaire/step-1");
    }
  }, []);

  return (
    <Box height="100%" width="100%" overflow="hidden">
      <Slide direction="left" in={true}>
        <Box height="100%" display="flex" gap={3}>
          <FormInputs>{Step(stepNumber)}</FormInputs>
          <FormInformation>{Info(stepNumber)}</FormInformation>
        </Box>
      </Slide>
    </Box>
  );
}
