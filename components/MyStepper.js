import {
  Box,
  Hidden,
  Step,
  StepButton,
  StepLabel,
  Stepper,
} from "@mui/material";

export default function MyStepper({
  steps,
  activeStep,
  handleStep,
  stepsAvalible,
}) {
  return (
    <Hidden mdDown>
      <Box width="100%" mx={-1}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step key={label} disabled={!stepsAvalible[index]}>
                <StepButton onClick={() => handleStep(index)}>
                  <StepLabel>{label}</StepLabel>
                </StepButton>
              </Step>
            );
          })}
        </Stepper>
      </Box>
    </Hidden>
  );
}
