import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Button, Hidden, MobileStepper } from "@mui/material";

export default function MyMobileStepper({
  steps,
  activeStep,
  stepsAvalible,
  handleBack,
  handleNext,
}) {
  return (
    <Hidden mdUp>
      <MobileStepper
        variant="progress"
        steps={steps.length}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            onClick={handleNext}
            disabled={!stepsAvalible[activeStep + 1]}
            endIcon={<KeyboardArrowRight />}
          >
            Вперед
          </Button>
        }
        backButton={
          <Button onClick={handleBack} startIcon={<KeyboardArrowLeft />}>
            Назад
          </Button>
        }
      />
    </Hidden>
  );
}
