import { Box, Typography, Stack, Alert } from "@mui/material";
import Image from "next/image";

export default function Info5() {
  return (
    <Box>
      <Stack spacing={2}>
        <Typography variant="h5">Склад фасаду</Typography>
        <Typography>
          Для визначення геометричних та теплофізичних характеристик стінових
          конструкцій, необхідно вказати розміри, та склад фасадів, та включень
          <em>(вікна, вері, стіни лоджії, тощо)</em> до них, відповідно до
          наступної схеми.
        </Typography>
        <Image src="/facade.svg" width={550} height={550} layout="responsive" />
        <Alert variant="outlined" severity="info">
          Включення додаються у випадках, коли певна ділянка фасаду, розділює
          опалюваний обʼєм із неопалюваним обʼємом будівлі, таким як, наприклад,
          засклена лоджія або сходова клітка неопалюваного підʼізду чи тамбур.
        </Alert>
      </Stack>
    </Box>
  );
}
