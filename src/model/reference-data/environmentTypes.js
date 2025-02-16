const environmentTypes = [
  {
    type: "Опалюваний обʼєм", // Тип навколишнього середовища
    temperatureDifferenceCorrectionCoefficient: 0, // Поправковий коефіцієнт
  },
  {
    type: "Неопалювана сходова клітка всередині будівлі",
    temperatureDifferenceCorrectionCoefficient: 0.4,
  },
  {
    type: "Неопалюване приміщення з трьома зовнішніми стінами (наприклад, зовнішні сходи)",
    temperatureDifferenceCorrectionCoefficient: 0.8,
  },
  {
    type: "Неопалюване приміщення з двома зовнішніми стінами тa дверима (наприклад, тамбур, хол, гараж)",
    temperatureDifferenceCorrectionCoefficient: 0.6,
  },
  {
    type: "Неопалюване приміщення з двома зовнішніми стінами без дверей",
    temperatureDifferenceCorrectionCoefficient: 0.5,
  },
  {
    type: "Неопалюване приміщення з однією зовнішньою стіною",
    temperatureDifferenceCorrectionCoefficient: 0.4,
  },
  {
    type: "Засклена лоджія для нового проєктування",
    temperatureDifferenceCorrectionCoefficient: 0.5,
  },
  {
    type: "Засклений балкон для нового проектування",
    temperatureDifferenceCorrectionCoefficient: 0.6,
  },
  {
    type: "Засклена лоджія наявних будівель - задовільний стан огородження",
    temperatureDifferenceCorrectionCoefficient: 0.7,
  },
  {
    type: "Засклена лоджія наявних будівель - незадовільний стан огородження",
    temperatureDifferenceCorrectionCoefficient: 0.85,
  },
  {
    type: "Засклений балкон наявних будівель - задовільний стан огородження",
    temperatureDifferenceCorrectionCoefficient: 0.8,
  },
  {
    type: "Засклений балкон наявних будівель - задовільний стан огородження",
    temperatureDifferenceCorrectionCoefficient: 0.9,
  },
];
export default environmentTypes;
