import { Step, StepButton, Stepper } from "@mui/material";

export default function FormStepper({ steps, activeStep, handleStep }) {
  return (
    <Stepper activeStep={activeStep}>
      {steps.map((step, index) => (
        <Step key={step.id}>
          <StepButton onClick={() => handleStep(index)}>
            {step.label}
          </StepButton>
        </Step>
      ))}
    </Stepper>
  );
}
