const testInputData = {
  // Step 1
  city: "Харків",
  terrain: "C",
  // Step 2
  purpose: "Багатоквартирні будинки, гуртожитки",
  heatCapacityClass: "Середній",
  airPermeabilityClass: "Герметична",
  constructionType: "Утеплені мінераловатними матеріалами в задовільному стані",
  // Step 3,
  buildingWidth: "44.295",
  buildingLength: "14.495",
  floorHeight: "3",
  numberOfFloors: "9",
  // Step 4.1
  ceiling: {
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
  // Step 4.2
  floor: {
    type: "Технічне підпілля",
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

  /* OLD TEST DATA */
  facades: [
    {
      direction: "north",
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
          variant: "4M₁-16-4i",
          air: 0,
          krypton: 100,
          argon: 0,
        },
        // ОК-3
        {
          width: 1.8,
          height: 1.2,
          quantity: 18,
          variant: "4M₁-16-4i",
          air: 0,
          krypton: 100,
          argon: 0,
        },
        // ОК-6
        {
          width: 1.2,
          height: 3.72,
          quantity: 36,
          variant: "4M₁-16-4i",
          air: 0,
          krypton: 100,
          argon: 0,
        },
      ],
      inclusions: [
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
        },
      ],
    },
    {
      direction: "east",
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
          variant: "4M₁-16-4i",
          air: 0,
          krypton: 100,
          argon: 0,
        },
      ],
      inclusions: [
        {
          width: 3.19,
          height: 27,
          environment: "Засклений балкон для нового проектування",
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
              variant: "4M₁-16-4i",
              air: 0,
              krypton: 100,
              argon: 0,
            },
            // ДБ-1
            {
              width: 2.4,
              height: 0.9,
              quantity: 9,
              variant: "4M₁-16-4i",
              air: 0,
              krypton: 100,
              argon: 0,
            },
          ],
        },
      ],
    },
    {
      direction: "south",
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
          variant: "4M₁-16-4i",
          air: 0,
          krypton: 100,
          argon: 0,
        },
        // ОК-4
        {
          width: 1.8,
          height: 1.5,
          quantity: 18,
          variant: "4M₁-16-4i",
          air: 0,
          krypton: 100,
          argon: 0,
        },
      ],
      inclusions: [
        {
          width: 11.4,
          height: 27,
          environment: "Засклений балкон для нового проектування",
          layers: [
            // 1-510 (балкон)
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
              variant: "4M₁-16-4i",
              air: 0,
              krypton: 100,
              argon: 0,
            },
            // ДБ-1
            {
              width: 2.4,
              height: 0.9,
              quantity: 36,
              variant: "4M₁-16-4i",
              air: 0,
              krypton: 100,
              argon: 0,
            },
          ],
        },
      ],
    },
    {
      direction: "west",
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
          variant: "4M₁-16-4i",
          air: 0,
          krypton: 100,
          argon: 0,
        },
      ],
      inclusions: [
        {
          width: 3.19,
          height: 27,
          environment: "Засклений балкон для нового проектування",
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
              variant: "4M₁-16-4i",
              air: 0,
              krypton: 100,
              argon: 0,
            },
            // ДБ-1
            {
              width: 2.4,
              height: 0.9,
              quantity: 9,
              variant: "4M₁-16-4i",
              air: 0,
              krypton: 100,
              argon: 0,
            },
          ],
        },
      ],
    },
  ],

  // SYSTEM DATA

  system: {
    heatGenerator:
      "Центральне якісне регулювання за температурним графіком 95 ℃ та нижче, без регулювання теплового потоку в ІТП або з регулюванням, залежним від погодних умов в ІТП низької ефективності (без обмеження максимальної витрати автоматичними засобами)",
    type: "Двотрубна",
    temperatureGradient: "30 К (наприклад, 55/45)",
    hydraulicAdjustment:
      "Система налагоджена. Наявні автоматичні регулятори перепаду тиску на стояках (вітках) з вісьмома та менше опалювальними приладами",
    pipesInsulation: "Ізольовані",
    heatingDevices: {
      type: "Радіатори",
      subtype: "встановлені під вікном без радіаційного захисту",
    },
    controlType: "Відсутнє",
  },
};

export default testInputData;
