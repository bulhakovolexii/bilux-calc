import { Box, Container } from "@mui/material";

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
export default Background;
