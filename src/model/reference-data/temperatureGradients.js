/*
Температурний напір (за температури повітря 20 °C)
Джерело: Джерело: Наказ мінрегіону № 169 від 11.07.2018 “Про затвердження Методики визначення енергетичної ефективності будівель”
URL: https://bulhakov.dev/bilux-calc/appendixes/appendix-h/
**/

const temperatureGradients = [
  {
    temperatureGradient: "30 К (наприклад, 55/45)",
    supply: 55,
    return: 45,
    verticalTemperatureProfileEfficiency: 0.95,
  },
  {
    temperatureGradient: "42,5 К (наприклад, 70/55)",
    supply: 70,
    return: 55,
    verticalTemperatureProfileEfficiency: 0.93,
  },
  {
    temperatureGradient: "60 К (наприклад, 90/70)",
    supply: 90,
    return: 70,
    verticalTemperatureProfileEfficiency: 0.88,
  },
];

export default temperatureGradients;
