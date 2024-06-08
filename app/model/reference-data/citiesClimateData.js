const citiesClimateData = [
  {
    region: "Харківська область", // Область
    city: "Харків", // Місто
    monthlyTemperatures: [
      -4.7, -3.8, 1.1, 9.6, 16, 19.6, 21.6, 20.7, 15.4, 8.6, 2.2, -2.5,
    ], // Середньомісячні температури зовнішнього середовища
    averageTemperatureBelow8: -1, // Середня температура періоду з середньодобовою температурою ≤ 8 ℃
    averageTemperatureBelow10: -0.2, // Середня температура періоду з середньодобовою температурою ≤ 10 ℃
    windDirectionRepeatability: {
      north: 8,
      east: 15.3,
      south: 10.7,
      west: 18.9,
    }, // Повторюваність напряму вітру
    januaryWindSpeed: { north: 4.5, east: 4.7, south: 4.4, west: 4.6 }, // Середня швидкість вітру в січні
    solarRadiation: [
      { north: 12, east: 19, south: 44, west: 20 },
      { north: 24, east: 36, south: 75, west: 40 },
      { north: 33, east: 60, south: 97, west: 63 },
      { north: 39, east: 81, south: 97, west: 77 },
      { north: 56, east: 107, south: 103, west: 101 },
      { north: 64, east: 115, south: 97, west: 107 },
      { north: 60, east: 113, south: 100, west: 109 },
      { north: 44, east: 100, south: 112, west: 95 },
      { north: 28, east: 76, south: 113, west: 72 },
      { north: 18, east: 42, south: 87, west: 40 },
      { north: 10, east: 19, south: 46, west: 19 },
      { north: 9, east: 14, south: 37, west: 15 },
    ], // Середньомісячні дози сонячної радіації
    heatingPeriodDates: {
      below8: {
        start: [14, 10], // [день, місяць]
        end: [11, 4], // [день, місяць]
      }, // Дати переходу середньої добової температури повітря через 8 ℃
      below10: {
        start: [5, 10], // [день, місяць]
        end: [19, 4], // [день, місяць]
      }, // Дати переходу середньої добової температури повітря через 10 ℃
    },
  },
];

export default citiesClimateData;
