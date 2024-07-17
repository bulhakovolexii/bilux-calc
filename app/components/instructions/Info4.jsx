import { Box, Typography, Stack } from "@mui/material";
import Image from "next/image";

export default function Info4() {
  return (
    <Box>
      <Stack spacing={2}>
        <Typography variant="h5">1. Варіанти конструкцій даху</Typography>
        <Box px={6}>
          <Image
            src="/roof-1.svg"
            width={550}
            height={550}
            layout="responsive"
          />
        </Box>
        <Typography align="center">1.1 Суміщене покриття</Typography>
        <Image src="/roof-2.png" width={550} height={550} layout="responsive" />
        <Typography align="center">1.2 Холодне горище</Typography>
        <Image src="/roof-3.png" width={550} height={550} layout="responsive" />
        <Typography align="center">1.3 Тепле горище</Typography>
        <Typography variant="h5">2. Варіанти конструкцій підлоги</Typography>
        <Image
          src="/non-heated-basement.svg"
          width={550}
          height={550}
          layout="responsive"
        />
        <Typography align="center">
          2.1 Підлога над неопалюваним підпіллям
        </Typography>
        <Image
          src="/ground-floor.svg"
          width={550}
          height={550}
          layout="responsive"
        />
        <Typography align="center">2.2 Підлога на ґрунті</Typography>
        <Image
          src="/heated-basement.svg"
          width={550}
          height={550}
          layout="responsive"
        />
        <Typography align="center">
          2.3 Опалюваний підвал (Цокольний поверх)
        </Typography>
      </Stack>
    </Box>
  );
}
