/*
Класи повітропроникності конструкцій згідно з ДСТУ EN 14351-1
Джерело: ДСТУ EN 14351-1:2020 Вікна та двері. Вимоги. Частина 1. Вікна та зовнішні двері
URL: https://bulhakov.dev/bilux-calc/calculation-method/ventilation/#1151-класи-повітропроникності-конструкцій-згідно-з-дсту-en-14351-1
**/

const airPermeabilityClasses = [
  {
    airPermeabilityClass: "Продувна", // Характеристика герметичності конструкції
    airPermeability: "50", // Показник повітропроникності за ΔP = 100 Па
  },
  {
    airPermeabilityClass: "Не герметична",
    airPermeability: "27",
  },
  {
    airPermeabilityClass: "Слабо герметична",
    airPermeability: "9",
  },
  {
    airPermeabilityClass: "Герметична",
    airPermeability: "3",
  },
];

export default airPermeabilityClasses;
