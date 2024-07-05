const materials = [
  {
    id: "1",
    type: "Теплоізоляційні матеріали", // Тип матеріалу
    subtypes: [
      {
        id: "1-1",
        subtype: "Волокнисті матеріали", // Підтип матеріалу
        names: [
          {
            id: "1-1-1",
            name: "Вироби теплоізоляційні з мінеральної вати на основі базальтового волокна", // Назва матеріалу
            variants: [
              { id: "1-1-1-1", density: "30", conductivity: "0.05" }, // { густина, теплопровідність }
              { id: "1-1-1-2", density: "40", conductivity: "0.049" },
              { id: "1-1-1-3", density: "50", conductivity: "0.048" },
              { id: "1-1-1-4", density: "75", conductivity: "0.047" },
              { id: "1-1-1-5", density: "100", conductivity: "0.048" },
              { id: "1-1-1-6", density: "125", conductivity: "0.049" },
              { id: "1-1-1-7", density: "150", conductivity: "0.05" },
              { id: "1-1-1-8", density: "175", conductivity: "0.052" },
              { id: "1-1-1-9", density: "200", conductivity: "0.053" },
              { id: "1-1-1-10", density: "225", conductivity: "0.054" },
            ],
          },
          {
            id: "1-1-2",
            name: "Вироби теплоізоляційні з мінеральної вати на основі скляного штапельного волокна",
            variants: [
              { id: "1-1-2-1", density: "10", conductivity: "0.057" },
              { id: "1-1-2-2", density: "15", conductivity: "0.052" },
              { id: "1-1-2-3", density: "20", conductivity: "0.05" },
              { id: "1-1-2-4", density: "35", conductivity: "0.047" },
              { id: "1-1-2-5", density: "70", conductivity: "0.045" },
            ],
          },
        ],
      },
      {
        id: "1-2",
        subtype: "Полімерні матеріали",
        names: [
          {
            id: "1-2-3",
            name: "Вироби зі спіненого пінополістиролу",
            variants: [
              { id: "1-2-3-1", density: "15", conductivity: "0.05" },
              { id: "1-2-3-2", density: "25", conductivity: "0.048" },
              { id: "1-2-3-3", density: "35", conductivity: "0.045" },
              { id: "1-2-3-4", density: "50", conductivity: "0.043" },
              { id: "1-2-3-5", density: "160", conductivity: "0.045" },
            ],
          },
          {
            id: "1-2-4",
            name: "Вироби із екструдованого пінополістиролу",
            variants: [
              { id: "1-2-4-1", density: "30", conductivity: "0.036" },
              { id: "1-2-4-2", density: "35", conductivity: "0.037" },
            ],
          },
          {
            id: "1-2-5",
            name: "Вироби з жорсткого пінополіуретану",
            variants: [
              { id: "1-2-5-1", density: "40", conductivity: "0.04" },
              { id: "1-2-5-2", density: "60", conductivity: "0.041" },
              { id: "1-2-5-3", density: "80", conductivity: "0.05" },
            ],
          },
          {
            id: "1-2-6",
            name: "Плити з резольно-формальдегідного пінопласту",
            variants: [
              { id: "1-2-6-1", density: "40", conductivity: "0.06" },
              { id: "1-2-6-2", density: "50", conductivity: "0.064" },
              { id: "1-2-6-3", density: "100", conductivity: "0.076" },
            ],
          },
          {
            id: "1-2-7",
            name: "Вироби зі спіненої карбамідно-формальдегідної смоли",
            variants: [
              { id: "1-2-7-1", density: "15", conductivity: "0.064" },
              { id: "1-2-7-2", density: "25", conductivity: "0.074" },
              { id: "1-2-7-3", density: "30", conductivity: "0.085" },
            ],
          },
          {
            id: "1-2-8",
            name: "Вироби зі спіненого пінополіетилену",
            variants: [
              { id: "1-2-8-1", density: "30", conductivity: "0.047" },
              { id: "1-2-8-2", density: "50", conductivity: "0.045" },
            ],
          },
          {
            id: "1-2-9",
            name: "Вироби зі спіненого хімічно зшитого пінополіетилену",
            variants: [{ id: "1-2-9-1", density: "30", conductivity: "0.043" }],
          },
        ],
      },
      {
        id: "1-3",
        subtype: "Вироби з природної органічної та неорганічної речовини",
        names: [
          {
            id: "1-3-10",
            name: "Вироби перлітофосфогельові",
            variants: [
              { id: "1-3-10-1", density: "200", conductivity: "0.09" },
              { id: "1-3-10-2", density: "300", conductivity: "0.12" },
            ],
          },
          {
            id: "1-3-11",
            name: "Блоки полістиролбетонні стінові",
            variants: [
              { id: "1-3-11-1", density: "200", conductivity: "0.08" },
              { id: "1-3-11-2", density: "300", conductivity: "0.11" },
              { id: "1-3-11-3", density: "600", conductivity: "0.2" },
            ],
          },
          {
            id: "1-3-12",
            name: "Вироби теплоізоляційні перліто-цементні та перлітогіпсові",
            variants: [
              { id: "1-3-12-1", density: "300", conductivity: "0.108" },
              { id: "1-3-12-2", density: "450", conductivity: "0.202" },
            ],
          },
          {
            id: "1-3-13",
            name: "Вироби перлітобентонітові теплоізоляційні",
            variants: [
              { id: "1-3-13-1", density: "250", conductivity: "0.091" },
              { id: "1-3-13-2", density: "300", conductivity: "0.11" },
              { id: "1-3-13-3", density: "400", conductivity: "0.16" },
            ],
          },
          {
            id: "1-3-14",
            name: "Целюлозний утеплювач",
            variants: [
              { id: "1-3-14-1", density: "35", conductivity: "0.048" },
              { id: "1-3-14-2", density: "50", conductivity: "0.052" },
              { id: "1-3-14-3", density: "65", conductivity: "0.056" },
              { id: "1-3-14-4", density: "100", conductivity: "0.07" },
            ],
          },
          {
            id: "1-3-15",
            name: "Вироби цементополістирольні",
            variants: [
              { id: "1-3-15-1", density: "250", conductivity: "0.1" },
              { id: "1-3-15-2", density: "300", conductivity: "0.11" },
              { id: "1-3-15-3", density: "400", conductivity: "0.15" },
              { id: "1-3-15-4", density: "500", conductivity: "0.19" },
              { id: "1-3-15-5", density: "550", conductivity: "0.21" },
            ],
          },
          {
            id: "1-3-16",
            name: "Вироби перлітобітумні теплоізоляційні",
            variants: [
              { id: "1-3-16-1", density: "300", conductivity: "0.099" },
              { id: "1-3-16-2", density: "400", conductivity: "0.13" },
            ],
          },
          {
            id: "1-3-17",
            name: "Вироби із піноскла",
            variants: [
              { id: "1-3-17-1", density: "120", conductivity: "0.051" },
            ],
          },
          {
            id: "1-3-18",
            name: "Блоки кремнезитоцементні",
            variants: [
              { id: "1-3-18-1", density: "300", conductivity: "0.086" },
              { id: "1-3-18-2", density: "400", conductivity: "0.096" },
              { id: "1-3-18-3", density: "500", conductivity: "0.11" },
            ],
          },
          {
            id: "1-3-19",
            name: "Вироби з арболіту на портландцементі",
            variants: [
              { id: "1-3-19-1", density: "300", conductivity: "0.14" },
              { id: "1-3-19-2", density: "400", conductivity: "0.16" },
              { id: "1-3-19-3", density: "600", conductivity: "0.23" },
              { id: "1-3-19-4", density: "800", conductivity: "0.3" },
            ],
          },
          {
            id: "1-3-20",
            name: "Плити теплоізоляційні очеретяні",
            variants: [
              { id: "1-3-20-1", density: "200", conductivity: "0.09" },
              { id: "1-3-20-2", density: "300", conductivity: "0.14" },
            ],
          },
          {
            id: "1-3-21",
            name: "Плити деревоволокнисті та деревостружкові",
            variants: [
              { id: "1-3-21-1", density: "200", conductivity: "0.08" },
              { id: "1-3-21-2", density: "400", conductivity: "0.13" },
              { id: "1-3-21-3", density: "600", conductivity: "0.16" },
              { id: "1-3-21-4", density: "800", conductivity: "0.23" },
              { id: "1-3-21-5", density: "1000", conductivity: "0.29" },
            ],
          },
        ],
      },
      {
        id: "1-4",
        subtype: "Бетони теплоізоляційні",
        names: [
          {
            id: "1-4-22",
            name: "Бетони ніздрюваті",
            variants: [
              { id: "1-4-22-1", density: "200", conductivity: "0.074" },
              { id: "1-4-22-2", density: "250", conductivity: "0.088" },
              { id: "1-4-22-3", density: "300", conductivity: "0.1" },
              { id: "1-4-22-4", density: "350", conductivity: "0.12" },
            ],
          },
          {
            id: "1-4-23",
            name: "Вермикулітобетон",
            variants: [
              { id: "1-4-23-1", density: "400", conductivity: "0.13" },
              { id: "1-4-23-2", density: "600", conductivity: "0.17" },
              { id: "1-4-23-3", density: "800", conductivity: "0.26" },
            ],
          },
        ],
      },
      {
        id: "1-5",
        subtype: "Матеріали теплоізоляційні засипні",
        names: [
          {
            id: "1-5-24",
            name: "Щебінь перлітовий",
            variants: [
              { id: "1-5-24-1", density: "300", conductivity: "0.12" },
            ],
          },
          {
            id: "1-5-25",
            name: "Гравій шлаковий",
            variants: [
              { id: "1-5-25-1", density: "300", conductivity: "0.13" },
            ],
          },
          {
            id: "1-5-26",
            name: "Щебінь шлаковий",
            variants: [
              { id: "1-5-26-1", density: "350", conductivity: "0.19" },
            ],
          },
          {
            id: "1-5-27",
            name: "Вермикулітова засипка",
            variants: [
              { id: "1-5-27-1", density: "100", conductivity: "0.08" },
              { id: "1-5-27-2", density: "150", conductivity: "0.098" },
              { id: "1-5-27-3", density: "200", conductivity: "0.105" },
              { id: "1-5-27-4", density: "250", conductivity: "0.11" },
            ],
          },
          {
            id: "1-5-28",
            name: "Гравій керамзитовий",
            variants: [
              { id: "1-5-28-1", density: "200", conductivity: "0.12" },
              { id: "1-5-28-2", density: "300", conductivity: "0.13" },
              { id: "1-5-28-3", density: "400", conductivity: "0.14" },
              { id: "1-5-28-4", density: "600", conductivity: "0.19" },
              { id: "1-5-28-5", density: "600", conductivity: "0.2" },
              { id: "1-5-28-6", density: "800", conductivity: "0.23" },
            ],
          },
          {
            id: "1-5-29",
            name: "Щебінь шлакопемзовий",
            variants: [
              { id: "1-5-29-1", density: "400", conductivity: "0.16" },
              { id: "1-5-29-2", density: "500", conductivity: "0.19" },
              { id: "1-5-29-3", density: "600", conductivity: "0.21" },
              { id: "1-5-29-4", density: "700", conductivity: "0.23" },
              { id: "1-5-29-5", density: "800", conductivity: "0.26" },
            ],
          },
          {
            id: "1-5-30",
            name: "Крихта із піноскла",
            variants: [
              { id: "1-5-30-1", density: "80", conductivity: "0.062" },
            ],
          },
          {
            id: "1-5-31",
            name: "Пісок для будівельних робіт",
            variants: [
              { id: "1-5-31-1", density: "1600", conductivity: "0.58" },
            ],
          },
        ],
      },
      {
        id: "1-6",
        subtype: "Розчини теплоізоляційні",
        names: [
          {
            id: "1-6-32",
            name: "Розчини цементно-перлітові",
            variants: [
              { id: "1-6-32-1", density: "600", conductivity: "0.23" },
              { id: "1-6-32-2", density: "800", conductivity: "0.26" },
              { id: "1-6-32-3", density: "1000", conductivity: "0.3" },
            ],
          },
          {
            id: "1-6-33",
            name: "Розчини гіпсоперлітові",
            variants: [
              { id: "1-6-33-1", density: "400", conductivity: "0.15" },
              { id: "1-6-33-2", density: "500", conductivity: "0.19" },
            ],
          },
          {
            id: "1-6-34",
            name: "Розчини цементно-кремнезитові",
            variants: [
              { id: "1-6-34-1", density: "200", conductivity: "0.08" },
              { id: "1-6-34-2", density: "300", conductivity: "0.09" },
            ],
          },
          {
            id: "1-6-35",
            name: "Розчини цементно-шлакові",
            variants: [
              { id: "1-6-35-1", density: "1200", conductivity: "0.58" },
              { id: "1-6-35-2", density: "1400", conductivity: "0.64" },
            ],
          },
          {
            id: "1-6-36",
            name: "Розчини цементно-пінополістирольні",
            variants: [
              { id: "1-6-36-1", density: "600", conductivity: "0.17" },
            ],
          },
          {
            id: "1-6-37",
            name: "Вироби на основі перліту",
            variants: [
              { id: "1-6-37-1", density: "320", conductivity: "0.095" },
              { id: "1-6-37-2", density: "330", conductivity: "0.104" },
              { id: "1-6-37-3", density: "370", conductivity: "0.115" },
              { id: "1-6-37-4", density: "450", conductivity: "0.14" },
            ],
          },
        ],
      },
    ],
  },

  {
    id: "2",
    type: "Конструкційно-теплоізоляційні матеріали",
    subtypes: [
      {
        id: "2-7",
        subtype: "Бетони ніздрюваті",
        names: [
          {
            id: "2-7-38",
            name: "Бетони ніздрюваті",
            variants: [
              { id: "2-7-38-1", density: "150", conductivity: "0.06" },
              { id: "2-7-38-2", density: "300", conductivity: "0.1" },
              { id: "2-7-38-3", density: "350", conductivity: "0.12" },
              { id: "2-7-38-4", density: "400", conductivity: "0.13" },
              { id: "2-7-38-5", density: "500", conductivity: "0.16" },
              { id: "2-7-38-6", density: "600", conductivity: "0.18" },
              { id: "2-7-38-7", density: "700", conductivity: "0.27" },
              { id: "2-7-38-8", density: "800", conductivity: "0.3" },
              { id: "2-7-38-9", density: "900", conductivity: "0.36" },
              { id: "2-7-38-10", density: "1000", conductivity: "0.44" },
              { id: "2-7-38-11", density: "1100", conductivity: "0.51" },
              { id: "2-7-38-12", density: "1200", conductivity: "0.55" },
            ],
          },
          {
            id: "2-7-39",
            name: "Газо- та пінозолобетон",
            variants: [
              { id: "2-7-39-1", density: "1000", conductivity: "0.5" },
              { id: "2-7-39-2", density: "1200", conductivity: "0.58" },
            ],
          },
        ],
      },
      {
        id: "2-8",
        subtype: "Бетони легкі",
        names: [
          {
            id: "2-8-40",
            name: "Керамзитобетон на керамзитовому піску",
            variants: [
              { id: "2-8-40-1", density: "600", conductivity: "0.26" },
              { id: "2-8-40-2", density: "800", conductivity: "0.31" },
              { id: "2-8-40-3", density: "1000", conductivity: "0.41" },
              { id: "2-8-40-4", density: "1200", conductivity: "0.52" },
              { id: "2-8-40-5", density: "1400", conductivity: "0.65" },
              { id: "2-8-40-6", density: "1600", conductivity: "0.79" },
              { id: "2-8-40-7", density: "1800", conductivity: "0.92" },
            ],
          },
          {
            id: "2-8-41",
            name: "Керамзитобетон на кварцовому піску з поризацією",
            variants: [
              { id: "2-8-41-1", density: "800", conductivity: "0.35" },
              { id: "2-8-41-2", density: "1000", conductivity: "0.47" },
              { id: "2-8-41-3", density: "1200", conductivity: "0.58" },
            ],
          },
          {
            id: "2-8-42",
            name: "Керамзитобетон на перлітовому піску",
            variants: [
              { id: "2-8-42-1", density: "800", conductivity: "0.35" },
              { id: "2-8-42-2", density: "1000", conductivity: "0.41" },
            ],
          },
          {
            id: "2-8-43",
            name: "Керамзитошлакобетон",
            variants: [
              { id: "2-8-43-1", density: "1000", conductivity: "0.41" },
            ],
          },
          {
            id: "2-8-44",
            name: "Перлітобетон",
            variants: [
              { id: "2-8-44-1", density: "600", conductivity: "0.23" },
              { id: "2-8-44-2", density: "800", conductivity: "0.33" },
              { id: "2-8-44-3", density: "1000", conductivity: "0.38" },
              { id: "2-8-44-4", density: "1200", conductivity: "0.5" },
            ],
          },
          {
            id: "2-8-45",
            name: "Шлакопемзобетон",
            variants: [
              { id: "2-8-45-1", density: "1000", conductivity: "0.37" },
              { id: "2-8-45-2", density: "1200", conductivity: "0.44" },
              { id: "2-8-45-3", density: "1400", conductivity: "0.52" },
              { id: "2-8-45-4", density: "1600", conductivity: "0.63" },
            ],
          },
          {
            id: "2-8-46",
            name: "Бетон на доменних гранульованих шлаках",
            variants: [
              { id: "2-8-46-1", density: "1200", conductivity: "0.52" },
              { id: "2-8-46-2", density: "1400", conductivity: "0.58" },
              { id: "2-8-46-3", density: "1600", conductivity: "0.64" },
            ],
          },
          {
            id: "2-8-47",
            name: "Бетон на зольному гравії",
            variants: [
              { id: "2-8-47-1", density: "1000", conductivity: "0.35" },
              { id: "2-8-47-2", density: "1200", conductivity: "0.47" },
              { id: "2-8-47-3", density: "1400", conductivity: "0.58" },
            ],
          },
        ],
      },
      {
        id: "2-9",
        subtype: "Вироби гіпсові",
        names: [
          {
            id: "2-9-48",
            name: "Плити з гіпсу",
            variants: [
              { id: "2-9-48-1", density: "1000", conductivity: "0.35" },
              { id: "2-9-48-2", density: "1200", conductivity: "0.47" },
            ],
          },
          {
            id: "2-9-49",
            name: "Листи гіпсокартонні",
            variants: [
              { id: "2-9-49-1", density: "800", conductivity: "0.21" },
            ],
          },
        ],
      },
      {
        id: "2-10",
        subtype: "Вироби бетонні",
        names: [
          {
            id: "2-10-50",
            name: "Блоки кремнезитоцементні",
            variants: [
              { id: "2-10-50-1", density: "700", conductivity: "0.23" },
              { id: "2-10-50-2", density: "800", conductivity: "0.24" },
              { id: "2-10-50-3", density: "1000", conductivity: "0.27" },
              { id: "2-10-50-4", density: "1200", conductivity: "0.29" },
            ],
          },
        ],
      },
      {
        id: "2-11",
        subtype: "Деревина та вироби з неї",
        names: [
          {
            id: "2-11-51",
            name: "Сосна та ялина поперек волокон",
            variants: [
              { id: "2-11-51-1", density: "500", conductivity: "0.18" },
            ],
          },
          {
            id: "2-11-52",
            name: "Сосна та ялина вздовж волокон",
            variants: [
              { id: "2-11-52-1", density: "500", conductivity: "0.35" },
            ],
          },
          {
            id: "2-11-53",
            name: "Дуб поперек волокон",
            variants: [
              { id: "2-11-53-1", density: "700", conductivity: "0.23" },
            ],
          },
          {
            id: "2-11-54",
            name: "Дуб вздовж волокон",
            variants: [
              { id: "2-11-54-1", density: "700", conductivity: "0.41" },
            ],
          },
          {
            id: "2-11-55",
            name: "Фанера клеєна",
            variants: [
              { id: "2-11-55-1", density: "600", conductivity: "0.18" },
            ],
          },
          {
            id: "2-11-56",
            name: "Картон облицювальний",
            variants: [
              { id: "2-11-56-1", density: "1000", conductivity: "0.23" },
            ],
          },
          {
            id: "2-11-57",
            name: "Картон будівельний багатошаровий",
            variants: [
              { id: "2-11-57-1", density: "650", conductivity: "0.18" },
            ],
          },
        ],
      },
      {
        id: "2-12",
        subtype: "Цегляна кладка з порожнистої цегли",
        names: [
          {
            id: "2-12-58",
            name: "Керамічної порожнистої густиною 1 400 кг/м³ (брутто) на цементно-піщаному розчині",
            variants: [
              { id: "2-12-58-1", density: "1600", conductivity: "0.64" },
            ],
          },
          {
            id: "2-12-59",
            name: "Керамічної порожнистої густиною 1 300 кг/м³ (брутто) на цементно-піщаному розчині",
            variants: [
              { id: "2-12-59-1", density: "1400", conductivity: "0.58" },
            ],
          },
          {
            id: "2-12-60",
            name: "Керамічної порожнистої густиною 1 000 кг/м³ (брутто) на цементно-піщаному розчині",
            variants: [
              { id: "2-12-60-1", density: "1200", conductivity: "0.52" },
            ],
          },
        ],
      },
      {
        id: "2-13",
        subtype: "Кладка з виробів бетонних",
        names: [
          {
            id: "2-13-61",
            name: "З блоків керамзитошлакобетонних на цементно-піщаному розчині густиною 800 кг/м³ (брутто)",
            variants: [
              { id: "2-13-61-1", density: "1350", conductivity: "0.43" },
            ],
          },
          {
            id: "2-13-62",
            name: "З блоків керамзитошлакобетонних на цементно-піщаному розчині густиною 850 кг/м³ (брутто)",
            variants: [
              { id: "2-13-62-1", density: "1400", conductivity: "0.51" },
            ],
          },
          {
            id: "2-13-63",
            name: "3 блоків кремнезитоцементних на вапняному розчині із сіопорового та кварцового піску",
            variants: [
              { id: "2-13-63-1", density: "400", conductivity: "0.092" },
            ],
          },
        ],
      },
    ],
  },

  {
    id: "3",
    type: "Матеріали конструкційні",
    subtypes: [
      {
        id: "3-14",
        subtype: "Бетони конструкційні",
        names: [
          {
            id: "3-14-64",
            name: "Залізобетон",
            variants: [
              { id: "3-14-64-1", density: "2500", conductivity: "2.04" },
            ],
          },
          {
            id: "3-14-65",
            name: "Бетон на гравії або щебені з природного каменю",
            variants: [
              { id: "3-14-65-1", density: "2400", conductivity: "1.86" },
            ],
          },
        ],
      },
      {
        id: "3-15",
        subtype: "Розчини будівельні",
        names: [
          {
            id: "3-15-66",
            name: "Розчин вапняно-піщаний",
            variants: [
              { id: "3-15-66-1", density: "1600", conductivity: "0.81" },
            ],
          },
          {
            id: "3-15-67",
            name: "Розчин складаний (пісок, вапно, цемент)",
            variants: [
              { id: "3-15-67-1", density: "1700", conductivity: "0.87" },
            ],
          },
          {
            id: "3-15-68",
            name: "Розчин цементно-піщаний",
            variants: [
              { id: "3-15-68-1", density: "1800", conductivity: "0.93" },
            ],
          },
        ],
      },
      {
        id: "3-16",
        subtype: "Облицювання природним каменем та керамічною плиткою",
        names: [
          {
            id: "3-16-69",
            name: "Плити та вироби з природного каменю: граніт, гнейс та базальт",
            variants: [
              { id: "3-16-69-1", density: "2800", conductivity: "3.49" },
            ],
          },
          {
            id: "3-16-70",
            name: "Мармур",
            variants: [
              { id: "3-16-70-1", density: "2800", conductivity: "2.91" },
            ],
          },
          {
            id: "3-16-71",
            name: "Вапняк",
            variants: [
              { id: "3-16-71-1", density: "1600", conductivity: "0.81" },
              { id: "3-16-71-2", density: "1800", conductivity: "1.05" },
              { id: "3-16-71-3", density: "2000", conductivity: "1.28" },
            ],
          },
          {
            id: "3-16-72",
            name: "Туф",
            variants: [
              { id: "3-16-72-1", density: "1000", conductivity: "0.29" },
              { id: "3-16-72-2", density: "1200", conductivity: "0.41" },
              { id: "3-16-72-3", density: "1400", conductivity: "0.52" },
              { id: "3-16-72-4", density: "1600", conductivity: "0.64" },
              { id: "3-16-72-5", density: "1800", conductivity: "0.81" },
              { id: "3-16-72-6", density: "2000", conductivity: "1.05" },
            ],
          },
          {
            id: "3-16-73",
            name: "Плити керамічні для підлоги",
            variants: [
              { id: "3-16-73-1", density: "2000", conductivity: "1.1" },
            ],
          },
        ],
      },
      {
        id: "3-17",
        subtype: "Кладка цегляна з повнотілої цегли",
        names: [
          {
            id: "3-17-74",
            name: "Керамічної звичайної на цементно-піщаному розчині",
            variants: [
              { id: "3-17-74-1", density: "1800", conductivity: "0.81" },
            ],
          },
          {
            id: "3-17-75",
            name: "Керамічної звичайної на цементно-шлаковому розчині",
            variants: [
              { id: "3-17-75-1", density: "1700", conductivity: "0.76" },
            ],
          },
          {
            id: "3-17-76",
            name: "Керамічної звичайної на цементно-перлітовому розчині",
            variants: [
              { id: "3-17-76-1", density: "1600", conductivity: "0.7" },
            ],
          },
          {
            id: "3-17-77",
            name: "Силікатної на цементно-піщаному розчині",
            variants: [
              { id: "3-17-77-1", density: "1800", conductivity: "0.87" },
            ],
          },
          {
            id: "3-17-78",
            name: "Трепельної на цементно-піщаному розчині",
            variants: [
              { id: "3-17-78-1", density: "1000", conductivity: "0.47" },
              { id: "3-17-78-2", density: "1200", conductivity: "0.52" },
            ],
          },
          {
            id: "3-17-79",
            name: "Шлакової на цементно-піщаному розчині",
            variants: [
              { id: "3-17-79-1", density: "1500", conductivity: "0.7" },
            ],
          },
        ],
      },
      {
        id: "3-18",
        subtype:
          "Матеріали покрівельні, гідроізоляційні, пароізоляційні та покриття полімерні для підлог",
        names: [
          {
            id: "3-18-80",
            name: "Листи азбестоцементні",
            variants: [
              { id: "3-18-80-1", density: "1600", conductivity: "0.41" },
              { id: "3-18-80-2", density: "1800", conductivity: "0.52" },
            ],
          },
          {
            id: "3-18-81",
            name: "Матеріали бітумні, бітумно-полімерні покрівельні та гідроізоляційні",
            variants: [
              { id: "3-18-81-1", density: "1000", conductivity: "0.17" },
              { id: "3-18-81-2", density: "1200", conductivity: "0.22" },
              { id: "3-18-81-3", density: "1400", conductivity: "0.27" },
            ],
          },
          {
            id: "3-18-82",
            name: "Асфальтобетон",
            variants: [
              { id: "3-18-82-1", density: "2100", conductivity: "1.05" },
            ],
          },
          {
            id: "3-18-83",
            name: "Руберойд, пергамін",
            variants: [
              { id: "3-18-83-1", density: "1000", conductivity: "0.17" },
            ],
          },
          {
            id: "3-18-84",
            name: "Мембрана ПВХ",
            variants: [
              { id: "3-18-84-1", density: "1000", conductivity: "0.23" },
            ],
          },
          {
            id: "3-18-85",
            name: "Пароізоляційна плівка",
            variants: [
              { id: "3-18-85-1", density: "1600", conductivity: "0.3" },
            ],
          },
          {
            id: "3-18-86",
            name: "Лінолеум полівінілхлоридний на теплоізоляційній підоснові",
            variants: [
              { id: "3-18-86-1", density: "1600", conductivity: "0.33" },
              { id: "3-18-86-2", density: "1800", conductivity: "0.38" },
            ],
          },
          {
            id: "3-18-87",
            name: "Лінолеум полівінілхлоридний на тканинній основі",
            variants: [
              { id: "3-18-87-1", density: "1400", conductivity: "0.23" },
              { id: "3-18-87-2", density: "1600", conductivity: "0.29" },
            ],
          },
          {
            id: "3-18-88",
            name: "Лінолеум полівінілхлоридний багатошаровий та одношаровий без підоснови",
            variants: [
              { id: "3-18-88-1", density: "800", conductivity: "0.17" },
              { id: "3-18-88-2", density: "1200", conductivity: "0.21" },
            ],
          },
        ],
      },
      {
        id: "3-19",
        subtype: "Метали та скло",
        names: [
          {
            id: "3-19-89",
            name: "Сталь арматурна",
            variants: [
              { id: "3-19-89-1", density: "7850", conductivity: "58" },
            ],
          },
          {
            id: "3-19-90",
            name: "Чавун",
            variants: [
              { id: "3-19-90-1", density: "7200", conductivity: "50" },
            ],
          },
          {
            id: "3-19-91",
            name: "Алюміній",
            variants: [
              { id: "3-19-91-1", density: "2600", conductivity: "221" },
            ],
          },
          {
            id: "3-19-92",
            name: "Латунь, мідь",
            variants: [
              { id: "3-19-92-1", density: "8500", conductivity: "407" },
            ],
          },
          {
            id: "3-19-93",
            name: "Скло віконне",
            variants: [
              { id: "3-19-93-1", density: "2500", conductivity: "0.76" },
            ],
          },
        ],
      },
    ],
  },
];

export default materials;
