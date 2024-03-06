const mockData = {
  city: "Харків",
  purpose: "Багатоквартирні будинки",
  constructionClass: "Середній",
  typeAndCondition: "утеплені мінераловатними матеріалами в задовільному стані",
  typeOfArea: "C",
  airtightness: "герметична",
  width: 44.295,
  length: 14.495,
  numberOfFloors: 9,
  heightOfFLoor: 3,
  floor: {
    type: "Перекриття над неопалюваним підвалом",
    layers: [
      {
        type: "Теплоізоляційні матеріали",
        subtype: "Полімерні матеріали",
        name: "Вироби зі спіненого пінополіетилену",
        density: 30,
        thickness: 0.03,
      },
      {
        type: "Конструкційно-теплоізоляційні матеріали",
        subtype: "Вироби бетонні",
        name: "Блоки кремнезитоцементні",
        density: 800,
        thickness: 0.05,
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
      layers: [
        // 1-510
        {
          type: "Теплоізоляційні матеріали",
          subtype: "Розчини теплоізоляційні",
          name: "Розчини цементно-пінополістирольні",
          density: 600,
          thickness: 0.01,
        },
        {
          type: "Теплоізоляційні матеріали",
          subtype: "Полімерні матеріали",
          name: "Вироби з жорсткого пінополіуретану",
          density: 60,
          thickness: 0.15,
        },
        {
          type: "Матеріали конструкційні",
          subtype: "Кладка цегляна з повнотілої цегли",
          name: "Силікатної на цементно-піщаному розчині",
          density: 1800,
          thickness: 0.51,
        },
      ],
      windows: [
        // ББО-1а
        {
          width: 2.4,
          height: 1.84,
          quantity: 18,
          variant: "4М₁-16-4і",
          air: 0,
          krypton: 100,
          argon: 0,
        },
        // ОК-3
        {
          width: 1.8,
          height: 1.2,
          quantity: 18,
          variant: "4М₁-16-4і",
          air: 0,
          krypton: 100,
          argon: 0,
        },
        // ОК-6
        {
          width: 1.2,
          height: 3.72,
          quantity: 36,
          variant: "4М₁-16-4і",
          air: 0,
          krypton: 100,
          argon: 0,
        },
      ],
      includes: [
        {
          width: 6.31,
          height: 27,
          layers: [
            // 2-380
            {
              type: "Теплоізоляційні матеріали",
              subtype: "Розчини теплоізоляційні",
              name: "Розчини цементно-пінополістирольні",
              density: 600,
              thickness: 0.01,
            },
            {
              type: "Теплоізоляційні матеріали",
              subtype: "Полімерні матеріали",
              name: "Вироби з жорсткого пінополіуретану",
              density: 60,
              thickness: 0.1,
            },
            {
              type: "Матеріали конструкційні",
              subtype: "Кладка цегляна з повнотілої цегли",
              name: "Силікатної на цементно-піщаному розчині",
              density: 1800,
              thickness: 0.38,
            },
          ],
          windows: [
            // ДП-3
            {
              width: 2.1,
              height: 1.3,
              quantity: 9,
              variant: "4М₁-16-4і",
              air: 0,
              krypton: 100,
              argon: 0,
            },
            // ДП-1
            {
              width: 2.1,
              height: 0.9,
              quantity: 9,
              variant: "4М₁-16-4і",
              air: 0,
              krypton: 100,
              argon: 0,
            },
          ],
        },
      ],
    },
    {
      direction: "Сх",
      layers: [
        // 1-510
        {
          type: "Теплоізоляційні матеріали",
          subtype: "Розчини теплоізоляційні",
          name: "Розчини цементно-пінополістирольні",
          density: 600,
          thickness: 0.01,
        },
        {
          type: "Теплоізоляційні матеріали",
          subtype: "Полімерні матеріали",
          name: "Вироби з жорсткого пінополіуретану",
          density: 60,
          thickness: 0.15,
        },
        {
          type: "Матеріали конструкційні",
          subtype: "Кладка цегляна з повнотілої цегли",
          name: "Силікатної на цементно-піщаному розчині",
          density: 1800,
          thickness: 0.51,
        },
      ],
      windows: [
        // ОК-4
        {
          width: 1.8,
          height: 1.5,
          quantity: 27,
          variant: "4М₁-16-4і",
          air: 0,
          krypton: 100,
          argon: 0,
        },
      ],
      includes: [
        {
          width: 3.19,
          height: 27,
          enviroment: "Засклений балкон для нового проектування",
          layers: [
            // 1-510-0 (балкон)
            {
              type: "Теплоізоляційні матеріали",
              subtype: "Розчини теплоізоляційні",
              name: "Розчини цементно-пінополістирольні",
              density: 600,
              thickness: 0.01,
            },
            {
              type: "Матеріали конструкційні",
              subtype: "Кладка цегляна з повнотілої цегли",
              name: "Силікатної на цементно-піщаному розчині",
              density: 1800,
              thickness: 0.51,
            },
          ],
          windows: [
            // ОК-1
            {
              width: 1.8,
              height: 0.75,
              quantity: 9,
              variant: "4М₁-16-4і",
              air: 0,
              krypton: 100,
              argon: 0,
            },
            // ДБ-1
            {
              width: 2.4,
              height: 0.9,
              quantity: 9,
              variant: "4М₁-16-4і",
              air: 0,
              krypton: 100,
              argon: 0,
            },
          ],
        },
      ],
    },
    {
      direction: "Пд",
      layers: [
        // 1-510
        {
          type: "Теплоізоляційні матеріали",
          subtype: "Розчини теплоізоляційні",
          name: "Розчини цементно-пінополістирольні",
          density: 600,
          thickness: 0.01,
        },
        {
          type: "Теплоізоляційні матеріали",
          subtype: "Полімерні матеріали",
          name: "Вироби з жорсткого пінополіуретану",
          density: 60,
          thickness: 0.15,
        },
        {
          type: "Матеріали конструкційні",
          subtype: "Кладка цегляна з повнотілої цегли",
          name: "Силікатної на цементно-піщаному розчині",
          density: 1800,
          thickness: 0.51,
        },
      ],
      windows: [
        // ОК-5
        {
          width: 1.8,
          height: 1.8,
          quantity: 54,
          variant: "4М₁-16-4і",
          air: 0,
          krypton: 100,
          argon: 0,
        },
        // ОК-4
        {
          width: 1.8,
          height: 1.5,
          quantity: 18,
          variant: "4М₁-16-4і",
          air: 0,
          krypton: 100,
          argon: 0,
        },
      ],
      includes: [
        {
          width: 11.4,
          height: 27,
          enviroment: "Засклений балкон для нового проектування",
          layers: [
            // 1-510
            {
              type: "Теплоізоляційні матеріали",
              subtype: "Розчини теплоізоляційні",
              name: "Розчини цементно-пінополістирольні",
              density: 600,
              thickness: 0.01,
            },
            {
              type: "Теплоізоляційні матеріали",
              subtype: "Полімерні матеріали",
              name: "Вироби з жорсткого пінополіуретану",
              density: 60,
              thickness: 0.15,
            },
            {
              type: "Матеріали конструкційні",
              subtype: "Кладка цегляна з повнотілої цегли",
              name: "Силікатної на цементно-піщаному розчині",
              density: 1800,
              thickness: 0.51,
            },
          ],
          windows: [
            // ОК-1
            {
              width: 1.8,
              height: 0.75,
              quantity: 36,
              variant: "4М₁-16-4і",
              air: 0,
              krypton: 100,
              argon: 0,
            },
            // ДБ-1
            {
              width: 2.4,
              height: 0.9,
              quantity: 36,
              variant: "4М₁-16-4і",
              air: 0,
              krypton: 100,
              argon: 0,
            },
          ],
        },
      ],
    },
    {
      direction: "Зх",
      layers: [
        // 1-510
        {
          type: "Теплоізоляційні матеріали",
          subtype: "Розчини теплоізоляційні",
          name: "Розчини цементно-пінополістирольні",
          density: 600,
          thickness: 0.01,
        },
        {
          type: "Теплоізоляційні матеріали",
          subtype: "Полімерні матеріали",
          name: "Вироби з жорсткого пінополіуретану",
          density: 60,
          thickness: 0.15,
        },
        {
          type: "Матеріали конструкційні",
          subtype: "Кладка цегляна з повнотілої цегли",
          name: "Силікатної на цементно-піщаному розчині",
          density: 1800,
          thickness: 0.51,
        },
      ],
      windows: [
        // ОК-4
        {
          width: 1.8,
          height: 1.5,
          quantity: 27,
          variant: "4М₁-16-4і",
          air: 0,
          krypton: 100,
          argon: 0,
        },
      ],
      includes: [
        {
          width: 3.19,
          height: 27,
          enviroment: "Засклений балкон для нового проектування",
          layers: [
            // 1-510-0 (балкон)
            {
              type: "Теплоізоляційні матеріали",
              subtype: "Розчини теплоізоляційні",
              name: "Розчини цементно-пінополістирольні",
              density: 600,
              thickness: 0.01,
            },
            {
              type: "Матеріали конструкційні",
              subtype: "Кладка цегляна з повнотілої цегли",
              name: "Силікатної на цементно-піщаному розчині",
              density: 1800,
              thickness: 0.51,
            },
          ],
          windows: [
            // ОК-1
            {
              width: 1.8,
              height: 0.75,
              quantity: 9,
              variant: "4М₁-16-4і",
              air: 0,
              krypton: 100,
              argon: 0,
            },
            // ДБ-1
            {
              width: 2.4,
              height: 0.9,
              quantity: 9,
              variant: "4М₁-16-4і",
              air: 0,
              krypton: 100,
              argon: 0,
            },
          ],
        },
      ],
    },
  ],
};

export default mockData;
