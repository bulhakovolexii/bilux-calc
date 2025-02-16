import {
  Box,
  Stack,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  Divider,
  Icon,
} from "@mui/material";

import CustomAppBar from "./components/MyAppBar";
import Link from "next/link";
import { Assessment, Checklist, House } from "@mui/icons-material";
import { cloneElement } from "react";
import Background from "./components/Background";
import Footer from "./components/Footer";

const CustomCard = ({ header, icon, points }) => {
  return (
    <Card elevation={24} sx={{ minHeight: "100%" }}>
      <CardHeader
        sx={{ pb: 0 }}
        title={
          <Box
            display="flex"
            gap={1}
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>{header}</Box>
            <Icon fontSize="large" color="primary">
              {cloneElement(icon, { fontSize: "large" })}
            </Icon>
          </Box>
        }
      />
      <CardContent>
        <List sx={{ p: 0 }}>
          {points?.map((point, index) => (
            <>
              <ListItem key={Math.random() * index} disableGutters>
                {point}
              </ListItem>
              {points.length > index + 1 && <Divider />}
            </>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

const points1 = [
  "Для розрахунку необхідно мати дані про геометричні характеристики будівлі",
  "Інформацію про тип і склад багатошарових огороджуючих конструкцій (підлога, дах, стіни)",
  "Тип і розміри віконних та дверних прорізів",
  "Тип і склад системи опалення",
];
const points2 = [
  "Вхідні дані приймають за допомогою інтерактивного опитувального листа",
  "Загальна кількість кроків – 7",
  "Приблизний час заповнення 15 хвилин",
];
const points3 = [
  "Розрахунок енергопотреби і енергоспоживання будівлі, визначені за методикою наближеної до державного стандарту ДСТУ 9190",
  "Необхідна потужність довгохвильових інфрачервоних обігрівачів BILUX",
  "Потенційна економія порівняно з вашою системою опалення, з врахуванням різниці тарифів",
];

export default function Home() {
  return (
    <Box>
      <CustomAppBar color="transparent" />
      <Container maxWidth="lg">
        <Box
          sx={{
            minHeight: "calc(100vh - 128px)",
            display: "flex",
            gap: 6,
            py: 6,
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Stack
            maxWidth={512}
            spacing={2}
            flexGrow={1}
            justifyContent="center"
          >
            <Typography variant="h3">Bilux CALC</Typography>
            <Typography variant="body1">
              Онлайн-калькулятор для розрахунку потенційної економії та строку
              окупності системи стельового променевого опалення. Введіть
              параметри приміщення та поточної системи опалення і отримайте
              оцінку витрат та строку окупності для переходу на інноваційне
              опалювання «Білюкс».
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                color="secondary"
                variant="contained"
                LinkComponent={Link}
                href="/questionnaire/step-1"
              >
                Почати
              </Button>
              <Button
                href="https://bulhakov.dev/bilux-calc/"
                target="_blank"
                color="primary"
                variant="contained"
              >
                Документація
              </Button>
            </Stack>
          </Stack>
          <Box flexGrow={1} alignItems="center">
            <Grid container spacing={4}>
              <Grid item xs={12} md={6} lg={4}>
                <CustomCard
                  icon={<House />}
                  header="Перед початком"
                  points={points1}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <CustomCard
                  header="Опитувальний лист"
                  icon={<Checklist />}
                  points={points2}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={4}>
                <CustomCard
                  header="Що ви отримаєте"
                  icon={<Assessment />}
                  points={points3}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}
