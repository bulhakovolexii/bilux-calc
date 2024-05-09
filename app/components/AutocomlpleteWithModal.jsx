export default function AutoocompleteWithModal({ children }) {
  return (
     <Controller
        name="city"
        control={control}
        rules={{
          required: "Оберіть місто",
        }}
        render={({ field, fieldState: { error } }) => {
          const { onChange, value, ref } = field;
          return (
            <Autocomplete
              options={cities}
              getOptionLabel={(city) => {
                return city.name;
              }}
              groupBy={(city) => city.region}
              value={
                value
                  ? cities.find((city) => {
                      return value === city.name;
                    }) ?? null
                  : null
              }
              onChange={(event, newValue) => {
                onChange(newValue ? newValue.name : null);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Місто"
                  variant="filled"
                  inputRef={ref}
                  error={!!error}
                  helperText={error?.message || " "}
                />
              )}
            />
          );
        }}
      />
  )
}