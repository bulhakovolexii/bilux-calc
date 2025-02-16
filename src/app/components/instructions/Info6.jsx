import { Box, Typography, Stack } from "@mui/material";
import Image from "next/image";

export default function Info6() {
  return (
    <Box>
      <Stack spacing={2}>
        <Typography variant="h5">Типи систем опалення</Typography>
        <Image
          src="/systems.svg"
          width={550}
          height={550}
          layout="responsive"
        />
      </Stack>
    </Box>
  );
}
