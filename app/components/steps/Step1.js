import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import Information from "../Information";
import InputsContainer from "../InputsContainer";
import { useFormContext } from "react-hook-form";

const Info1 = () => {
  return (
    <>
      <Typography variant="h5">Hello, World!</Typography>
      <Typography variant="body1">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem iusto
        amet beatae aut sapiente recusandae ratione consequuntur maiores,
        commodi autem reiciendis illo nostrum adipisci accusantium sunt quidem
        voluptate illum voluptatum?
      </Typography>
    </>
  );
};

export default function Step1() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  return (
    <Box height="100%" display="flex" gap={3}>
      <InputsContainer>
        <form>{/* inputs */}</form>
      </InputsContainer>
      <Information>
        <Info1 />
      </Information>
    </Box>
  );
}
