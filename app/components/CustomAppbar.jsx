import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Button,
} from "@mui/material";

export default function CustomAppBar({ color, elevation }) {
  return (
    <AppBar color={color} elevation={elevation}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              width: "48px",
              height: "48px",
              backgroundImage: "url(/logo.svg)",
              backgroundSize: "cover",
            }}
          />
          <Typography variant="h5" sx={{ fontWeight: 700, ml: 2 }}>
            BILUX CALC
          </Typography>
          <Box sx={{ flexGrow: 1 }}>{/* pages */}</Box>
          <Button
            color="primary"
            variant="contained"
            href="https://bilux.ua/dealership/"
          >
            Стати дилером
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
