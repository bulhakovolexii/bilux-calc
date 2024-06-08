const purposes = [
  {
    purpose: "Багатоквартирні будинки, гуртожитки", // Функційне призначення будівлі
    indoorTemperature: 20, // Внутрішня температура будівлі
    usageHoursPerWeek: 112, // Графік використання, год/тиждень
    internalHeatGains: {
      // Внутрішні теплонадходження
      fromMetabolicHeat: 1.8, // від метаболічної теплоти, Вт/м²
      fromLighting: 2, // від освітлення, Вт/м²
      fromEquipment: 2, // від обладнання, Вт/м²
    },
  },
];

export default purposes;
