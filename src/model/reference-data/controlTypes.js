const controlTypes = [
  { type: "Відсутнє", temperatureControlEfficiency: 0.86 },
  { type: "Двопозиційне регулювання", temperatureControlEfficiency: 0.93 },
  { type: "П-регулювання* (2 К**)", temperatureControlEfficiency: 0.93 },
  { type: "П-регулювання (1 К**)", temperatureControlEfficiency: 0.95 },
  { type: "ПI-регулювання***", temperatureControlEfficiency: 0.97 },
  {
    type: "ПI-регулювання з оптимізацією (наприклад, наявність диспетчеризації, адаптованого контролю)",
    temperatureControlEfficiency: 0.99,
  },
];

export default controlTypes;
