import { Box, Typography, Stack, Alert } from "@mui/material";
import Image from "next/image";

export default function Info3() {
  return (
    <Box>
      <Stack spacing={2}>
        <Typography variant="h5">
          Визначення розрахункових розмірів будівлі
        </Typography>
        <Alert variant="outlined" severity="info">
          Опалювана площа будівлі — сумарна площа поверхів (враховуючи, зокрема,
          мансардний, опалюваний цокольний і підвальний поверхи) будівлі, яку
          вимірюють у межах <strong>внутрішніх поверхонь </strong>
          зовнішніх стін, з урахуванням площі, що займають горизонтальні
          проекції внутрішніх стін і перегородок.
        </Alert>
        <Typography>
          Вкажіть розміри опалюваного обʼєму будівлі, відповідно до вказівок на
          рисунку:
        </Typography>
        <Image
          src="/geometry.svg"
          width={760}
          height={807}
          layout="responsive"
        />
        <Alert variant="outlined" severity="info">
          Опалюваний обʼєм — визначають як добуток кондиціонованої площі першого
          опалюваного поверху на внутрішню висоту, що вимірюють від поверхні
          підлоги першого поверху до поверхні стелі останнього поверху.
        </Alert>
      </Stack>
    </Box>
  );
}
