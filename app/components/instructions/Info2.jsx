import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

export default function Info2() {
  return (
    <Box>
      <Typography variant="h5">Внутрішня теплоємність будівлі</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Клас</TableCell>
            <TableCell>Деталізація</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Дуже легкий</TableCell>
            <TableCell>
              Каркасні будівлі зі стінами полегшеної конструкції —
              збірно-щитові, каркасно-засипні, деревʼяні, сендвіч-панелі, тощо
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Легкий</TableCell>
            <TableCell>
              Будівлі зі стінами з монолітного шлакобетону, шлакоблоків, блоків
              з ніздрюватого бетону, черепашнику, та інших дрібноштучних виробів
              із залізобетонними чи деревʼяними перекриттями
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Середній</TableCell>
            <TableCell>
              Будівлі великопанельні, великоблокові, з цегляними стінами
              товщиною в одну цеглу, із залізобетонними чи деревʼяними
              перекриттями
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Важкий</TableCell>
            <TableCell>
              Капітальні будівлі з цегляними стінами товщиною (1,5 — 2 цеглини),
              із залізобетонними перекриттями
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ borderBottom: "none " }}>Дуже важкий</TableCell>
            <TableCell sx={{ borderBottom: "none " }}>
              Особливо капітальні будівлі з камʼяними або целяними стінами
              (товщиною 2,5 — 3,5 цеглини), із залізобетонним чи металевим
              каркасом, із залізобетонним перекриттям
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
}
