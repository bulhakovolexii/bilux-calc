import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const DimensionsField = ({
  name,
  rule,
  minValue,
  step,
  error,
  dimension,
  label,
  control,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: rule,
        min: {
          value: minValue,
          message: error,
        },
      }}
      render={({ field, fieldState: { error } }) => {
        const { onChange, value, ref } = field;
        return (
          <TextField
            fullWidth
            type="number"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            inputRef={ref}
            inputProps={{ inputMode: "numeric", min: minValue, step: step }}
            InputProps={{ endAdornment: dimension, sx: { gap: 1 } }}
            variant="filled"
            label={label}
            error={!!error}
            helperText={error?.message || " "}
          />
        );
      }}
    />
  );
};

export default DimensionsField;
