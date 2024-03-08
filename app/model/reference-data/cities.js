const cities = [
  {
    name: "Харків",
    weather: {
      phi_e: [-4.7, -3.8, 1.1, 9.6, 16, 19.6, 21.6, 20.7, 15.4, 8.6, 2.2, -2.5],
      phi_e_seas_8: -1,
      phi_e_seas_10: -0.2,
      repeatabilityOfWindDirection: { Пн: 8, Сх: 15.3, Пд: 10.7, Зх: 18.9 },
      averageWindSpeedForJanuary: { Пн: 4.5, Сх: 4.7, Пд: 4.4, Зх: 4.6 },
      solarRadiation: [
        [12, 19, 44, 20],
        [24, 36, 75, 40],
        [33, 60, 97, 63],
        [39, 81, 97, 77],
        [56, 107, 103, 101],
        [64, 115, 97, 107],
        [60, 113, 100, 109],
        [44, 100, 112, 95],
        [28, 76, 113, 72],
        [18, 42, 87, 40],
        [10, 19, 46, 19],
        [9, 14, 37, 15],
      ],
      heatedPeriod_8: {
        start: [14, 10],
        end: [11, 4],
      },
      heatedPeriod_10: {
        start: [5, 10],
        end: [19, 4],
      },
    },
  },
];
export default cities;
