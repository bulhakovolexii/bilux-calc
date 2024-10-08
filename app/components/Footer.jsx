import { Container, Box, Typography, Link, Tooltip } from "@mui/material";

export default function Footer() {
  return (
    <Container maxWidth="xl">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={1}
        flexWrap="wrap"
        sx={{ pb: "5.5px" }}
      >
        <Box display="flex" flexGrow={1} alignItems="center" gap={1}>
          <Typography>Розроблено за підтримки:</Typography>
          <Box
            flexGrow={1}
            display="flex"
            gap={1}
            sx={{ justifyContent: { xs: "end", sm: "center", md: "start" } }}
          >
            <Tooltip title='Кафедра електричних станцій НТУ "ХПІ"'>
              <Link
                href="https://sites.kpi.kharkov.ua/es/HomeU"
                target="_blank"
                lineHeight={1}
              >
                <Box
                  component="img"
                  src="/department-logo.svg"
                  width={48}
                  height={48}
                />
              </Link>
            </Tooltip>
            <Tooltip title="Навчально-науковий інститут енергетики, електроніки та електромеханіки">
              <Link
                href="https://web.kpi.kharkov.ua/eee/"
                target="_blank"
                lineHeight={1}
              >
                <Box
                  component="img"
                  src="/institute-logo.svg"
                  width={48}
                  height={48}
                />
              </Link>
            </Tooltip>
            <Tooltip title="Національний технічний університет «Харківський політехнічний інститут»">
              <Link
                href="https://www.kpi.kharkov.ua/ukr/"
                target="_blank"
                lineHeight={1}
              >
                <Box
                  component="img"
                  src="/university-logo.svg"
                  width={48}
                  height={48}
                />
              </Link>
            </Tooltip>
          </Box>
        </Box>
        <Typography>Copyright © 2023-{new Date().getFullYear()}</Typography>
      </Box>
    </Container>
  );
}
