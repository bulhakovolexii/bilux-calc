/*
Щомісячна тривалість часових інтервалів
Джерело: ДСТУ 9190:2022 Енергетична ефективність будівель. Метод розрахунку енергоспоживання під час опалення, охолодження, вентиляції, освітлення та гарячого водопостачання
https://bulhakov.dev/bilux-calc/calculation-method/transmission/#2-щомісячна-тривалість-часових-інтервалів
**/

const monthlyDurationIntervals = [
  { month: "Січень", days: 31, hours: 744 },
  { month: "Лютий", days: 28, hours: 672 },
  { month: "Березень", days: 31, hours: 744 },
  { month: "Квітень", days: 30, hours: 720 },
  { month: "Травень", days: 31, hours: 744 },
  { month: "Червень", days: 30, hours: 720 },
  { month: "Липень", days: 31, hours: 744 },
  { month: "Серпень", days: 31, hours: 744 },
  { month: "Вересень", days: 30, hours: 720 },
  { month: "Жовтень", days: 31, hours: 744 },
  { month: "Листопад", days: 30, hours: 720 },
  { month: "Грудень", days: 31, hours: 744 },
];

export default monthlyDurationIntervals;
