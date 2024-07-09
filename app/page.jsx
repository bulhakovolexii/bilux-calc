import {
  Avatar,
  Box,
  Stack,
  Container,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  Divider,
} from "@mui/material";

import CustomAppBar from "./components/MyAppBar";
import Link from "next/link";
import { Assessment, Checklist, House } from "@mui/icons-material";

const Background = ({ maxWidth }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        overflow: "hidden",
        height: "100vh",
        width: "100vw",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: -1,
      }}
    >
      <Container
        maxWidth={maxWidth}
        sx={{ position: "relative", height: "100%" }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "870px",
            minHeight: "800px",
            top: "-165px",
            right: "-356px",
            bgcolor: "#F4E982",
            borderRadius: "50%",
            filter: "blur(276px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            width: "876px",
            minHeight: "692px",
            bottom: "-200px",
            right: "70px",
            bgcolor: "#8FC590",
            borderRadius: "50%",
            filter: "blur(276px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            maxWidth: "100%",
            width: "900px",
            minHeight: "900px",
            opacity: 0.1,
            top: "-150px",
            right: "-60px",
            backgroundImage: "url(/logo.svg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        />
      </Container>
    </Box>
  );
};

const CustomCard = ({ header, icon, points }) => {
  return (
    <Card elevation={24} sx={{ minHeight: "100%" }}>
      <CardHeader
        title={
          <Box
            display="flex"
            gap={1}
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>{header}</Box>
            <Avatar>{icon}</Avatar>
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
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec felis arcu. Etiam vitae lacus sapien. Maecenas id libero facilisis, tempus turpis id, maximus nunc.",
  "Donec consequat lobortis quam, sed maximus magna fringilla ac.",
  "Aliquam auctor egestas lacus eget molestie. Sed ut est et metus venenatis vulputate. Vestibulum ac diam ex.",
];
const points2 = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec felis arcu. Etiam vitae lacus sapien. Maecenas id libero facilisis, tempus turpis id, maximus nunc.",
  "Donec consequat lobortis quam, sed maximus magna fringilla ac.",
  "Aliquam auctor egestas lacus eget molestie. Sed ut est et metus venenatis vulputate. Vestibulum ac diam ex.",
];
const points3 = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec felis arcu. Etiam vitae lacus sapien. Maecenas id libero facilisis, tempus turpis id, maximus nunc.",
  "Donec consequat lobortis quam, sed maximus magna fringilla ac.",
  "Aliquam auctor egestas lacus eget molestie. Sed ut est et metus venenatis vulputate. Vestibulum ac diam ex.",
];

export default function Home() {
  return (
    <Box>
      <Background maxWidth="lg" />
      <CustomAppBar color="transparent" />
      <Toolbar />
      <Container maxWidth="lg">
        <Box
          sx={{
            minHeight: "calc(100vh - 64px)",
            display: "flex",
            gap: 6,
            pb: 2,
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Stack maxWidth={512} spacing={2}>
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
          <Grid container spacing={4}>
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
    </Box>
  );
}
