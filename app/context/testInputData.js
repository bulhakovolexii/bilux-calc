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
        id: 1,
        thickness: "100",
        material: { id: "1-6-32-1", density: "600", conductivity: "0.23" },
      },
      {
        id: 2,
        thickness: "220",
        material: { id: "3-14-64-1", density: "2500", conductivity: "2.04" },
      },
    ],
  },
  // Step 4.2
  floor: {
    type: "Технічне підпілля",
    layers: [
      {
        id: 1,
        thickness: "30",
        material: { id: "1-2-8-1", density: "30", conductivity: "0.047" },
      },
      {
        id: 2,
        thickness: "50",
        material: { id: "2-10-50-2", density: "800", conductivity: "0.24" },
      },
      {
        id: 3,
        thickness: "220",
        material: { id: "3-14-64-1", density: "2500", conductivity: "2.04" },
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
          id: 1,
          thickness: "10",
          material: { id: "1-6-36-1", density: "600", conductivity: "0.17" },
        },
        {
          id: 2,
          thickness: "150",
          material: { id: "1-2-5-2", density: "60", conductivity: "0.041" },
        },
        {
          id: 3,
          thickness: "510",
          material: { id: "3-17-77-1", density: "1800", conductivity: "0.87" },
        },
      ],
      windows: [
        // ББО-1а
        {
          id: 1,
          width: "2.4",
          height: "1.84",
          quantity: "18",
          variant: "4M₁-16-4i",
          air: "0",
          krypton: "100",
          argon: "0",
        },
        // ОК-3
        {
          id: 2,
          width: "1.8",
          height: "1.2",
          quantity: "18",
          variant: "4M₁-16-4i",
          air: "0",
          krypton: "100",
          argon: "0",
        },
        // ОК-6
        {
          id: 3,
          width: "1.2",
          height: "3.72",
          quantity: "36",
          variant: "4M₁-16-4i",
          air: "0",
          krypton: "100",
          argon: "0",
        },
      ],
      inclusions: [
        {
          id: 1,
          width: "6.31",
          height: "27",
          layers: [
            // 2-380
            {
              id: 1,
              thickness: "10",
              material: {
                id: "1-6-36-1",
                density: "600",
                conductivity: "0.17",
              },
            },
            {
              id: 2,
              thickness: "100",
              material: { id: "1-2-5-2", density: "60", conductivity: "0.041" },
            },
            {
              id: 3,
              thickness: "380",
              material: {
                id: "3-17-77-1",
                density: "1800",
                conductivity: "0.87",
              },
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
          id: 1,
          thickness: "10",
          material: { id: "1-6-36-1", density: "600", conductivity: "0.17" },
        },
        {
          id: 2,
          thickness: "150",
          material: { id: "1-2-5-2", density: "60", conductivity: "0.041" },
        },
        {
          id: 3,
          thickness: "510",
          material: { id: "3-17-77-1", density: "1800", conductivity: "0.87" },
        },
      ],
      windows: [
        // ОК-4
        {
          id: 1,
          width: "1.8",
          height: "1.5",
          quantity: "27",
          variant: "4M₁-16-4i",
          air: "0",
          krypton: "100",
          argon: "0",
        },
      ],
      inclusions: [
        {
          id: 1,
          width: "3.19",
          height: "27",
          environment: "Засклений балкон для нового проектування",
          layers: [
            // 1-510-0 (балкон)
            {
              id: 1,
              thickness: "10",
              material: {
                id: "1-6-36-1",
                density: "600",
                conductivity: "0.17",
              },
            },
            {
              id: 2,
              thickness: "510",
              material: {
                id: "3-17-77-1",
                density: "1800",
                conductivity: "0.87",
              },
            },
          ],
          windows: [
            // ОК-1
            {
              id: 1,
              width: "1.8",
              height: "0.75",
              quantity: "9",
              variant: "4M₁-16-4i",
              air: "0",
              krypton: "100",
              argon: "0",
            },
            // ДБ-1
            {
              id: 2,
              width: "2.4",
              height: "0.9",
              quantity: "9",
              variant: "4M₁-16-4i",
              air: "0",
              krypton: "100",
              argon: "0",
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
          id: 1,
          thickness: "10",
          material: { id: "1-6-36-1", density: "600", conductivity: "0.17" },
        },
        {
          id: 2,
          thickness: "150",
          material: { id: "1-2-5-2", density: "60", conductivity: "0.041" },
        },
        {
          id: 3,
          thickness: "510",
          material: { id: "3-17-77-1", density: "1800", conductivity: "0.87" },
        },
      ],
      windows: [
        // ОК-5
        {
          id: 1,
          width: "1.8",
          height: "1.8",
          quantity: "54",
          variant: "4M₁-16-4i",
          air: "0",
          krypton: "100",
          argon: "0",
        },
        // ОК-4
        {
          id: 2,
          width: "1.8",
          height: "1.5",
          quantity: "18",
          variant: "4M₁-16-4i",
          air: "0",
          krypton: "100",
          argon: "0",
        },
      ],
      inclusions: [
        {
          id: 1,
          width: "11.4",
          height: "27",
          environment: "Засклений балкон для нового проектування",
          layers: [
            // 1-510 (балкон)
            {
              id: 1,
              thickness: "10",
              material: {
                id: "1-6-36-1",
                density: "600",
                conductivity: "0.17",
              },
            },
            {
              id: 2,
              thickness: "150",
              material: { id: "1-2-5-2", density: "60", conductivity: "0.041" },
            },
            {
              id: 3,
              thickness: "510",
              material: {
                id: "3-17-77-1",
                density: "1800",
                conductivity: "0.87",
              },
            },
          ],
          windows: [
            // ОК-1
            {
              id: 1,
              width: "1.8",
              height: "0.75",
              quantity: "36",
              variant: "4M₁-16-4i",
              air: "0",
              krypton: "100",
              argon: "0",
            },
            // ДБ-1
            {
              id: 2,
              width: "2.4",
              height: "0.9",
              quantity: "36",
              variant: "4M₁-16-4i",
              air: "0",
              krypton: "100",
              argon: "0",
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
          id: 1,
          thickness: "10",
          material: { id: "1-6-36-1", density: "600", conductivity: "0.17" },
        },
        {
          id: 2,
          thickness: "150",
          material: { id: "1-2-5-2", density: "60", conductivity: "0.041" },
        },
        {
          id: 3,
          thickness: "510",
          material: { id: "3-17-77-1", density: "1800", conductivity: "0.87" },
        },
      ],
      windows: [
        // ОК-4
        {
          id: 1,
          width: "1.8",
          height: "1.5",
          quantity: "27",
          variant: "4M₁-16-4i",
          air: "0",
          krypton: "100",
          argon: "0",
        },
      ],
      inclusions: [
        {
          id: 1,
          width: "3.19",
          height: "27",
          environment: "Засклений балкон для нового проектування",
          layers: [
            // 1-510-0 (балкон)
            {
              id: 1,
              thickness: "10",
              material: {
                id: "1-6-36-1",
                density: "600",
                conductivity: "0.17",
              },
            },
            {
              id: 2,
              thickness: "510",
              material: {
                id: "3-17-77-1",
                density: "1800",
                conductivity: "0.87",
              },
            },
          ],
          windows: [
            // ОК-1
            {
              id: 1,
              width: "1.8",
              height: "0.75",
              quantity: "9",
              variant: "4M₁-16-4i",
              air: "0",
              krypton: "100",
              argon: "0",
            },
            // ДБ-1
            {
              id: 2,
              width: "2.4",
              height: "0.9",
              quantity: "9",
              variant: "4M₁-16-4i",
              air: "0",
              krypton: "100",
              argon: "0",
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
    pipesInsulation: true,
    temperatureGradient: "30 К (наприклад, 55/45)",
    hydraulicAdjustment:
      "Система налагоджена. Наявні автоматичні регулятори перепаду тиску на стояках (вітках) з вісьмома та менше опалювальними приладами",
    heatingDevices: {
      type: "Радіатори",
      subtype: "встановлені під вікном без радіаційного захисту",
    },
    controlType: "Відсутнє",
  },
};

export default testInputData;
