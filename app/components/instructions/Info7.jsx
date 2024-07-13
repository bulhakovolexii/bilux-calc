import { Box, Typography, Stack, List, ListItem, Alert } from "@mui/material";

export default function Info7() {
  return (
    <Box>
      <Typography variant="h5">Різновиди регуляторів</Typography>
      <List>
        <ListItem disableGutters divider>
          Позиційні регулятори – ті у яких регулюючий орган переміщується
          стрибкоподібно із одного крайнього положення в інше кожний раз, коли
          регульована величина досягне певного заданого значення. Найпоширеніші
          дво- та трипозиційні регулятори.
        </ListItem>
        <ListItem disableGutters divider>
          Пропорційні регулятори (П-регулятори) діють на регулюючий орган
          пропорційно відхиленню регульованої величини від заданого значення.
        </ListItem>
        <ListItem disableGutters>
          (ПІ - регулятори) діють на регулюючий орган пропорційно відхиленню та
          інтегралу від відхилення регульованої величини.
        </ListItem>
      </List>
      <Alert variant="outlined" severity="info">
        * — пропорційне регулювання.
        <br />
        ** — точність регулювання температури (в градусах Кельвіна).
        <br />
        *** — пропорційне інтегральне регулювання.
      </Alert>
    </Box>
  );
}
