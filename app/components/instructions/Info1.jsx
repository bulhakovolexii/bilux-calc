import { Box, Typography, List, ListItem } from "@mui/material";
import Image from "next/image";

export default function Info1() {
  return (
    <Box>
      <Image
        src="/country.svg"
        width={502}
        height={336}
        alt="Map of Ukraine"
        layout="responsive"
      />
      <Typography variant="h5">Характеристика місцевості</Typography>
      <List>
        <ListItem disableGutters>
          А — відкрите узбережжя моря, озера, водосховища, поле;
        </ListItem>
        <ListItem disableGutters>
          В — територія, лісовий масив тощо з рівномірно розташованими
          перешкодами заввишки понад 10 м;
        </ListItem>
        <ListItem disableGutters>
          С — місцевість з розташованими будинками заввишки понад 25 м.
        </ListItem>
      </List>
    </Box>
  );
}
