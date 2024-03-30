import Information from "@/components/Information";
import { Box, Typography } from "@mui/material";

const Info = () => {
  return (
    <>
      <Typography variant="h5">Hello, Wolrld!</Typography>
      <Typography variant="body1">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
        repudiandae sunt itaque facere rem cum ducimus distinctio veniam
        obcaecati quidem laborum tenetur esse vero quasi, non similique minima?
        Quos, quasi.
      </Typography>
    </>
  );
};

export default function Step1() {
  return (
    <>
      <Box flex="1 1 50%"></Box>

      <Information>
        <Info />
      </Information>
    </>
  );
}
