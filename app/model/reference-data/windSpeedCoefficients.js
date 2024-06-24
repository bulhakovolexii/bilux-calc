const windSpeedCoefficients = [
  {
    // Висота будівлі, (від lower до upper)
    lower: 0,
    upper: 5,
    // Характеристика місцевості
    A: 0.75,
    B: 0.5,
    C: 0.4,
  },
  {
    lower: 5,
    upper: 10,
    A: 1.0,
    B: 0.65,
    C: 0.4,
  },
  {
    lower: 10,
    upper: 20,
    A: 1.25,
    B: 0.85,
    C: 0.55,
  },
  {
    lower: 20,
    upper: 40,
    A: 1.5,
    B: 1.1,
    C: 0.8,
  },
  {
    lower: 40,
    upper: 60,
    A: 1.7,
    B: 1.3,
    C: 1.0,
  },
  {
    lower: 60,
    upper: 80,
    A: 1.85,
    B: 1.45,
    C: 1.15,
  },
  {
    lower: 80,
    upper: 100,
    A: 2.0,
    B: 1.6,
    C: 1.25,
  },
  {
    lower: 100,
    upper: 150,
    A: 2.25,
    B: 1.9,
    C: 1.55,
  },
  {
    lower: 150,
    upper: 200,
    A: 2.45,
    B: 2.1,
    C: 1.8,
  },
  {
    lower: 200,
    upper: 250,
    A: 2.65,
    B: 2.3,
    C: 2.0,
  },
  {
    lower: 250,
    upper: 300,
    A: 2.75,
    B: 2.5,
    C: 2.2,
  },
  {
    lower: 300,
    upper: 350,
    A: 2.75,
    B: 2.75,
    C: 2.35,
  },
  {
    lower: 350,
    upper: 999,
    A: 2.75,
    B: 2.75,
    C: 2.35,
  },
];

export default windSpeedCoefficients;
