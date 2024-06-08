const constructionTypes = [
  {
    constructionType:
      "Неутеплені, залізобетонні панелі або кладка з крупноблокових елементів з міжпанельними стиками в незадовільному стані", // Тип і стан стінових конструкцій
    airLeakageAdjustmentFactor: 1.3, // Коефіцієнт, що враховує витрату повітря через глухі стінові конструкції оболонки будівлі
  },
  {
    constructionType:
      "Неутеплені, кладка з дрібноштучних виробів у незадовільному стані",
    airLeakageAdjustmentFactor: 1.2,
  },
  {
    constructionType:
      "Утеплені мінераловатними матеріалами в задовільному стані",
    airLeakageAdjustmentFactor: 1.1,
  },
  {
    constructionType: "Утеплені органічними матеріалами в задовільному стані",
    airLeakageAdjustmentFactor: 1.05,
  },
];

export default constructionTypes;
