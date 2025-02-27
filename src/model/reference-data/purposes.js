/*
1. Значення скоригованої температури
Джерело: ДСТУ 9190:2022 Енергетична ефективність будівель. Метод розрахунку енергоспоживання під час опалення, охолодження, вентиляції, освітлення та гарячого водопостачання
URL: https://bulhakov.dev/bilux-calc/calculation-method/transmission/#1-значення-скоригованої-температури

2 Теплонадходження від людей, освітлення та обладнання та графік використання
Джерело: ДСТУ 9190:2022 Енергетична ефективність будівель. Метод розрахунку енергоспоживання під час опалення, охолодження, вентиляції, освітлення та гарячого водопостачання
URL: https://bulhakov.dev/bilux-calc/calculation-method/internal/#11-теплонадходження-від-людей-освітлення-та-обладнання-значення-за-замовчуванням
**/

const purposes = [
  {
    purpose: "Одноквартирні будинки", // Функційне призначення будівлі
    indoorTemperature: 19, // Внутрішня температура будівлі
    usageHoursPerWeek: 112, // Графік використання, год/тиждень
    gainsFromMetabolicHeat: 1.2, // від метаболічної теплоти, Вт/м²
    gainsFromLighting: 2, // від освітлення, Вт/м²
    gainsFromEquipment: 2, // від обладнання, Вт/м²
  },
  {
    purpose: "Багатоквартирні будинки, гуртожитки",
    indoorTemperature: 19,
    usageHoursPerWeek: 112,
    gainsFromMetabolicHeat: 1.8,
    gainsFromLighting: 2,
    gainsFromEquipment: 2,
  },
  {
    purpose: "Громадські будівлі адміністративного призначення, офіси",
    indoorTemperature: 19,
    usageHoursPerWeek: 50,
    gainsFromMetabolicHeat: 4,
    gainsFromLighting: 7,
    gainsFromEquipment: 6,
  },
  {
    purpose: "Будівлі навчальних закладів",
    indoorTemperature: 19,
    usageHoursPerWeek: 50,
    gainsFromMetabolicHeat: 7,
    gainsFromLighting: 7,
    gainsFromEquipment: 6,
  },
  {
    purpose: "Будівлі дитячих навчальних закладів",
    indoorTemperature: 21,
    usageHoursPerWeek: 50,
    gainsFromMetabolicHeat: 7,
    gainsFromLighting: 7,
    gainsFromEquipment: 3,
  },
  {
    purpose: "Будівлі закладів охорони здоровʼя",
    indoorTemperature: 21,
    usageHoursPerWeek: 168,
    gainsFromMetabolicHeat: 2.7,
    gainsFromLighting: 7,
    gainsFromEquipment: 6,
  },
  {
    purpose: "Готелі",
    indoorTemperature: 19,
    usageHoursPerWeek: 168,
    gainsFromMetabolicHeat: 4,
    gainsFromLighting: 8,
    gainsFromEquipment: 2,
  },
  {
    purpose: "Ресторани",
    indoorTemperature: 19,
    usageHoursPerWeek: 84,
    gainsFromMetabolicHeat: 5,
    gainsFromLighting: 8,
    gainsFromEquipment: 4,
  },
  {
    purpose: "Спортивні заклади",
    indoorTemperature: 17,
    usageHoursPerWeek: 84,
    gainsFromMetabolicHeat: 5,
    gainsFromLighting: 8,
    gainsFromEquipment: 1,
  },
  {
    purpose: "Будівлі закладів гуртової та роздрібної торгівлі",
    indoorTemperature: 19,
    usageHoursPerWeek: 84,
    gainsFromMetabolicHeat: 7,
    gainsFromLighting: 12,
    gainsFromEquipment: 2,
  },
  {
    purpose: "Будівлі культурно-розважальних закладів та дозвільних установ",
    indoorTemperature: 19,
    usageHoursPerWeek: 56,
    gainsFromMetabolicHeat: 5,
    gainsFromLighting: 8,
    gainsFromEquipment: 2,
  },
  {
    purpose: "Інші види будівель",
    indoorTemperature: 19,
    usageHoursPerWeek: 60,
    gainsFromMetabolicHeat: 3,
    gainsFromLighting: 7,
    gainsFromEquipment: 2,
  },
];

export default purposes;
