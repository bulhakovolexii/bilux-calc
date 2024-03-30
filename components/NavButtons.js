import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Box, Button, Hidden } from "@mui/material";

export default function NavButtons({
  activeStep,
  stepsAvalible,
  handleBack,
  handleNext,
}) {
  return (
    <Hidden mdDown>
      <Box display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          sx={{ minWidth: "8em" }}
          onClick={handleBack}
          startIcon={<KeyboardArrowLeft />}
        >
          Назад
        </Button>
        <Button
          variant="contained"
          sx={{ minWidth: "8em" }}
          onClick={handleNext}
          disabled={!stepsAvalible[activeStep + 1]}
          endIcon={<KeyboardArrowRight />}
        >
          Вперед
        </Button>
      </Box>
    </Hidden>
  );
}
