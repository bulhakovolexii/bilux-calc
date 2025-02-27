/*
Значення типового опору теплопередачі дверей відповідно до типу
**/

const doors = [
  {
    variant: "Профіль ПВХ (2 камери)", // Тип дверей
    thermalResistance: 0.46, // Опір теплопередачі дверей
  },
  {
    variant: "Профіль ПВХ (3 камери)",
    thermalResistance: 0.5,
  },
  {
    variant: "Профіль ПВХ (5 камер)",
    thermalResistance: 0.77,
  },
  {
    variant: "Профіль ПВХ (7 камер)",
    thermalResistance: 1,
  },
  {
    variant: "Метал без утеплювача",
    thermalResistance: 0.17,
  },
  {
    variant: "Метал з утеплювачем",
    thermalResistance: 0.52,
  },
  {
    variant: "Деревина",
    thermalResistance: 0.58,
  },
  {
    variant: "Поліуретан",
    thermalResistance: 0.36,
  },
];
export default doors;
