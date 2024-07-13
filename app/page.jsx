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
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec felis arcu.",
  "Donec consequat lobortis quam, sed maximus magna fringilla ac.",
  "Aliquam auctor egestas lacus eget molestie.",
];
const points2 = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec felis arcu.",
  "Donec consequat lobortis quam, sed maximus magna fringilla ac.",
  "Aliquam auctor egestas lacus eget molestie.",
];
const points3 = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec felis arcu.",
  "Donec consequat lobortis quam, sed maximus magna fringilla ac.",
  "Aliquam auctor egestas lacus eget molestie.",
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
          <Grid container spacing={4} flexGrow={1} alignItems="center">
            <Grid item xs={12} md={6} lg={4}>
              <CustomCard
                header="Що ви отримаєте"
                icon={<Assessment />}
                points={points1}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <CustomCard
                header="Перед початком"
                icon={<House />}
                points={points2}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
              <CustomCard
                header="Опитувальний лист"
                icon={<Checklist />}
                points={points3}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}
