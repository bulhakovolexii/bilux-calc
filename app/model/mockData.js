const mockData = {
  city: "Харків",
  purpose: "Багатоквартирні будинки",
  constructionClass: "Середній",
  width: 44.51,
  length: 16.67,
  numberOfFloors: 9,
  heightOfFLoor: 3,
  floor: {
    type: "Технічне підпілля",
    layers: [
      {
        thickness: 0.01,
        type: "Теплоізоляційні матеріали",
        subtype: "Волокнисті матеріали",
        name: "Вироби теплоізоляційні з мінеральної вати на основі базальтовоговолокна",
        density: 30,
      },
    ],
  },
  ceil: {
    type: "Холодне горище багатоповерхових будівель",
    layers: [
      {
        thickness: 0.01,
        type: "Теплоізоляційні матеріали",
        subtype: "Волокнисті матеріали",
        name: "Вироби теплоізоляційні з мінеральної вати на основі базальтовоговолокна",
        density: 30,
      },
    ],
  },
  facades: [
    {
      direction: "Пн",
      layers: [],
    },
    {
      direction: "Сх",
      layers: [],
    },
    {
      direction: "Пд",
      layers: [],
    },
    {
      direction: "Зх",
      layers: [],
    },
  ],
};

export default mockData;
