const systemTypes = [
  {
    type: "Двотрубна",
    hydraulicAdjustment:
      "Система не налагоджена. Відсутні балансувальні клапани на стояках (горизонтальних вітках) системи",
    hydraulicAdjustmentCoefficient: "1.03",
  },
  {
    type: "Двотрубна",
    hydraulicAdjustment:
      "Система налагоджена. Наявні автоматичні регулятори перепаду тиску на стояках (вітках) з більше ніж вісьмома опалювальними приладами або наявне тільки статичне налагодження системи (ручні балансувальні клапани)",
    hydraulicAdjustmentCoefficient: "1.01",
  },
  {
    type: "Двотрубна",
    hydraulicAdjustment:
      "Система налагоджена. Наявні автоматичні регулятори перепаду тиску на стояках (вітках) з вісьмома та менше опалювальними приладами",
    hydraulicAdjustmentCoefficient: "1",
  },
  {
    type: "Двотрубна",
    hydraulicAdjustment:
      "Система налагоджена. Наявне автоматичне регулювання перепаду тиску в терморегуляторах або електронних регуляторах витрати теплоносія на опалювальних приладах (автоматичних регуляторах температури повітря у приміщенні)",
    hydraulicAdjustmentCoefficient: "0.98",
  },
  {
    type: "Однотрубна (постійний гідравлічний режим)",
    hydraulicAdjustment:
      "Система не налагоджена. Відсутня балансувальна арматура на стояках (горизонтальних вітках) системи",
    hydraulicAdjustmentCoefficient: "1.09",
  },
  {
    type: "Однотрубна (постійний гідравлічний режим)",
    hydraulicAdjustment:
      "Система налагоджена. Наявна ручна балансувальна арматура на стояках (горизонтальних вітках)",
    hydraulicAdjustmentCoefficient: "1.07",
  },
  {
    type: "Однотрубна (постійний гідравлічний режим)",
    hydraulicAdjustment:
      "Система налагоджена. Наявні автоматичні регулятори (стабілізатори) витрати на стояках (горизонтальних вітках)",
    hydraulicAdjustmentCoefficient: "1.05",
  },
  {
    type: "Однотрубна (змінний гідравлічний режим)",
    hydraulicAdjustment:
      "Система налагоджена. Наявні автоматичні регулятори (обмежувачі) витрати зі стабілізацією температури теплоносія на виході зі стояка (горизонтальної вітки)",
    hydraulicAdjustmentCoefficient: "1.01",
  },
  {
    type: "Однотрубна (змінний гідравлічний режим)",
    hydraulicAdjustment:
      "Система налагоджена. Наявні автоматичні регулятори (обмежувачі) витрати з регулюванням температури теплоносія на виході зі стояка (горизонтальної вітки) за температурним графіком",
    hydraulicAdjustmentCoefficient: "1",
  },
  {
    type: "Не гідравлічна",
    hydraulicAdjustmentCoefficient: "1",
  },
];

export default systemTypes;
