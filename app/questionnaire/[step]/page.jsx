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
import Step5 from "@/app/components/steps/Step5";
import Step6 from "@/app/components/steps/Step6";
import Step7 from "@/app/components/steps/Step7";

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
    case 5:
      return <Step5 />;
    case 6:
      return <Step6 />;
    case 7:
      return <Step7 />;
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

  const inputDataIsEmpty = !getValues("city") || !getValues("terrain");

  if (stepNumber > 1 && inputDataIsEmpty) {
    router.push("/questionnaire/step-1");
  } else {
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
}
