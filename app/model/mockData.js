const mockData = {
  city: "Харків",
  purpose: "Багатоквартирні будинки",
  constructionClass: "Середній",
  width: 44.295,
  length: 14.495,
  numberOfFloors: 9,
  heightOfFLoor: 3,
  floor: {
    type: "Технічне підпілля",
    layers: [
      {
        type: "Матеріали конструкційні",
        subtype: "Бетони конструкційні",
        name: "Залізобетон",
        density: 2500,
        thickness: 0.22,
      },
    ],
  },
  ceil: {
    type: "Холодне горище багатоповерхових будівель",
    layers: [
      {
        type: "Теплоізоляційні матеріали",
        subtype: "Розчини теплоізоляційні",
        name: "Розчини цементно-перлітові",
        density: 600,
        thickness: 0.1,
      },
      {
        type: "Матеріали конструкційні",
        subtype: "Бетони конструкційні",
        name: "Залізобетон",
        density: 2500,
        thickness: 0.22,
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
