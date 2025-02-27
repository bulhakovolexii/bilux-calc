/*
Національні значення для внутрішньої теплоємності
Джерело: ДСТУ 9190:2022 Енергетична ефективність будівель. Метод розрахунку енергоспоживання під час опалення, охолодження, вентиляції, освітлення та гарячого водопостачання
URL: https://bulhakov.dev/bilux-calc/calculation-method/utilisation-factor/#13-національні-значення-для-внутрішньої-теплоємності
**/

const heatCapacityClasses = [
  {
    heatCapacityClass: "Дуже легкий", // Клас будівлі
    heatCapacity: 25, // Внутрішня теплоємність будівлі, на одиницю площі
  },
  {
    heatCapacityClass: "Легкий",
    heatCapacity: 35,
  },
  {
    heatCapacityClass: "Середній",
    heatCapacity: 50,
  },
  {
    heatCapacityClass: "Важкий",
    heatCapacity: 80,
  },
  {
    heatCapacityClass: "Дуже важкий",
    heatCapacity: 110,
  },
];

export default heatCapacityClasses;
