const materials = [
  {
    type: "Теплоізоляційні матеріали",
    subtype: "Волокнисті матеріали",
    name: "Вироби теплоізоляційні з мінеральної вати на основі базальтовоговолокна",
    variants: [
      { density: 30, conductivity: 0.05 },
      { density: 40, conductivity: 0.049 },
      { density: 50, conductivity: 0.048 },
      { density: 75, conductivity: 0.047 },
      { density: 100, conductivity: 0.048 },
      { density: 125, conductivity: 0.049 },
      { density: 150, conductivity: 0.05 },
      { density: 175, conductivity: 0.052 },
      { density: 200, conductivity: 0.053 },
      { density: 225, conductivity: 0.054 },
    ],
  },

  {
    type: "Теплоізоляційні матеріали",
    subtype: "Волокнисті матеріали",
    name: "Вироби теплоізоляційні з мінеральної вати на основі скляногоштапельного волокна",
    variants: [
      { density: 10, conductivity: 0.057 },
      { density: 15, conductivity: 0.052 },
      { density: 20, conductivity: 0.05 },
      { density: 35, conductivity: 0.047 },
      { density: 70, conductivity: 0.045 },
    ],
  },

  {
    type: "Теплоізоляційні матеріали",
    subtype: "Полімерні матеріали",
    name: "Вироби зі спіненого пінополістиролу",
    variants: [
      { density: 15, conductivity: 0.05 },
      { density: 25, conductivity: 0.048 },
      { density: 35, conductivity: 0.045 },
      { density: 50, conductivity: 0.043 },
      { density: 160, conductivity: 0.045 },
    ],
  },

  {
    type: "Теплоізоляційні матеріали",
    subtype: "Полімерні матеріали",
    name: "Вироби із екструдованого пінополістиролу",
    variants: [
      { density: 30, conductivity: 0.036 },
      { density: 35, conductivity: 0.037 },
    ],
  },

  {
    type: "Теплоізоляційні матеріали",
    subtype: "Полімерні матеріали",
    name: "Вироби з жорсткого пінополіуретану",
    variants: [
      { density: 40, conductivity: 0.04 },
      { density: 60, conductivity: 0.041 },
      { density: 80, conductivity: 0.05 },
    ],
  },

  {
    type: "Теплоізоляційні матеріали",
    subtype: "Полімерні матеріали",
    name: "Плити з резольно-формальдегідного пінопласту",
    variants: [
      { density: 40, conductivity: 0.06 },
      { density: 50, conductivity: 0.064 },
      { density: 100, conductivity: 0.076 },
    ],
  },

  {
    type: "Теплоізоляційні матеріали",
    subtype: "Полімерні матеріали",
    name: "Вироби зі спіненої карбамідно-формальдегідної смоли",
    variants: [
      { density: 15, conductivity: 0.064 },
      { density: 25, conductivity: 0.074 },
      { density: 30, conductivity: 0.085 },
    ],
  },

  {
    type: "Теплоізоляційні матеріали",
    subtype: "Полімерні матеріали",
    name: "Вироби зі спіненого пінополіетилену",
    variants: [
      { density: 30, conductivity: 0.047 },
      { density: 50, conductivity: 0.045 },
    ],
  },

  {
    type: "Теплоізоляційні матеріали",
    subtype: "Полімерні матеріали",
    name: "Вироби зі спіненого хімічно зшитого пінополіетилену",
    variants: [{ density: 30, conductivity: 0.043 }],
  },
  {
    type: "Теплоізоляційні матеріали",
    subtype: "Вироби з природної органічної та неорганічної речовини",
    name: "Вироби перлітофосфогельові",
    variants: [
      { density: 200, conductivity: 0.09 },
      { density: 300, conductivity: 0.12 },
    ],
  },

  {
    type: "Теплоізоляційні матеріали",
    subtype: "Вироби з природної органічної та неорганічної речовини",
    name: "Блоки полістиролбетонні стінові",
    variants: [
      { density: 200, conductivity: 0.08 },
      { density: 300, conductivity: 0.11 },
      { density: 600, conductivity: 0.2 },
    ],
  },

  {
    type: "Теплоізоляційні матеріали",
    subtype: "Вироби з природної органічної та неорганічної речовини",
    name: "Вироби теплоізоляційні перліто-цементні та перлітогіпсові",
    variants: [
      { density: 300, conductivity: 0.108 },
      { density: 450, conductivity: 0.202 },
    ],
  },

  {
    type: "Теплоізоляційні матеріали",
    subtype: "Вироби з природної органічної та неорганічної речовини",
    name: "Вироби перлітобентонітові теплоізоляційні",
    variants: [
      { density: 250, conductivity: 0.091 },
      { density: 300, conductivity: 0.11 },
      { density: 400, conductivity: 0.16 },
    ],
  },

  {
    type: "Теплоізоляційні матеріали",
    subtype: "Вироби з природної органічної та неорганічної речовини",
    name: "Целюлозний утеплювач",
    variants: [
      { density: 35, conductivity: 0.048 },
      { density: 50, conductivity: 0.052 },
      { density: 65, conductivity: 0.056 },
      { density: 100, conductivity: 0.07 },
    ],
  },

  {
    type: "Теплоізоляційні матеріали",
    subtype: "Вироби з природної органічної та неорганічної речовини",
    name: "Вироби цементополістирольні",
    variants: [
      { density: 250, conductivity: 0.1 },
      { density: 300, conductivity: 0.11 },
      { density: 400, conductivity: 0.15 },
      { density: 500, conductivity: 0.19 },
      { density: 550, conductivity: 0.21 },
    ],
  },

  {
    type: "Теплоізоляційні матеріали",
    subtype: "Вироби з природної органічної та неорганічної речовини",
    name: "Вироби перлітобітумні теплоізоляційні",
    variants: [
      { density: 300, conductivity: 0.099 },
      { density: 400, conductivity: 0.13 },
    ],
  },

  {
    type: "Теплоізоляційні матеріали",
    subtype: "Вироби з природної органічної та неорганічної речовини",
    name: "Вироби із піноскла",
    variants: [{ density: 120, conductivity: 0.051 }],
  },
  {
    type: "Теплоізоляційні матеріали",
    subtype: "Вироби з природної органічної та неорганічної речовини",
    name: "Блоки кремнезитоцементні",
    variants: [
      { density: 300, conductivity: 0.086 },
      { density: 400, conductivity: 0.096 },
      { density: 500, conductivity: 0.11 },
    ],
  },

  {
    type: "Теплоізоляційні матеріали",
    subtype: "Вироби з природної органічної та неорганічної речовини",
    name: "Вироби з арболіту на портландцементі",
    variants: [
      { density: 300, conductivity: 0.14 },
      { density: 400, conductivity: 0.16 },
      { density: 600, conductivity: 0.23 },
      { density: 800, conductivity: 0.3 },
    ],
  },

  {
    type: "Теплоізоляційні матеріали",
    subtype: "Вироби з природної органічної та неорганічної речовини",
    name: "Плити теплоізоляційні очеретяні",
    variants: [
      { density: 200, conductivity: 0.09 },
      { density: 300, conductivity: 0.14 },
    ],
  },

  {
    type: "Теплоізоляційні матеріали",
    subtype: "Вироби з природної органічної та неорганічної речовини",
    name: "Плити деревоволокнисті та деревостружкові",
    variants: [
      { density: 200, conductivity: 0.08 },
      { density: 400, conductivity: 0.13 },
      { density: 600, conductivity: 0.16 },
      { density: 800, conductivity: 0.23 },
      { density: 1000, conductivity: 0.29 },
    ],
  },

  {
    type: "Теплоізоляційні матеріали",
    subtype: "Бетони теплоізоляційні",
    name: "Бетони ніздрюваті",
    variants: [
      { density: 200, conductivity: 0.074 },
      { density: 250, conductivity: 0.088 },
      { density: 300, conductivity: 0.1 },
      { density: 350, conductivity: 0.12 },
    ],
  },

  {
    type: "Теплоізоляційні матеріали",
    subtype: "Бетони теплоізоляційні",
    name: "Вермикулітобетон",
    variants: [
      { density: 400, conductivity: 0.13 },
      { density: 600, conductivity: 0.17 },
      { density: 800, conductivity: 0.26 },
    ],
  },

  {
    type: "Теплоізоляційні матеріали",
    subtype: "Матеріали теплоізоляційні засипні",
    name: "Щебінь перлітовий",
    variants: [{ density: 300, conductivity: 0.12 }],
  },
  {
    type: "Теплоізоляційні матеріали",
    subtype: "Матеріали теплоізоляційні засипні",
    name: "Гравій шлаковий",
    variants: [{ density: 300, conductivity: 0.13 }],
  },
  {
    type: "Теплоізоляційні матеріали",
    subtype: "Матеріали теплоізоляційні засипні",
    name: "Щебінь шлаковий",
    variants: [{ density: 350, conductivity: 0.19 }],
  },
  {
    type: "Теплоізоляційні матеріали",
    subtype: "Матеріали теплоізоляційні засипні",
    name: "Вермикулітова засипка",
    variants: [
      { density: 100, conductivity: 0.08 },
      { density: 150, conductivity: 0.098 },
      { density: 200, conductivity: 0.105 },
      { density: 250, conductivity: 0.11 },
    ],
  },

  {
    type: "Теплоізоляційні матеріали",
    subtype: "Матеріали теплоізоляційні засипні",
    name: "Гравій керамзитовий",
    variants: [
      { density: 200, conductivity: 0.12 },
      { density: 300, conductivity: 0.13 },
      { density: 400, conductivity: 0.14 },
      { density: 600, conductivity: 0.19 },
      { density: 600, conductivity: 0.2 },
      { density: 800, conductivity: 0.23 },
    ],
  },

  {
    type: "Теплоізоляційні матеріали",
    subtype: "Матеріали теплоізоляційні засипні",
    name: "Щебінь шлакопемзовий",
    variants: [
      { density: 400, conductivity: 0.16 },
      { density: 500, conductivity: 0.19 },
      { density: 600, conductivity: 0.21 },
      { density: 700, conductivity: 0.23 },
      { density: 800, conductivity: 0.26 },
    ],
  },

  {
    type: "Теплоізоляційні матеріали",
    subtype: "Матеріали теплоізоляційні засипні",
    name: "Крихта із піноскла",
    variants: [{ density: 80, conductivity: 0.062 }],
  },
  {
    type: "Теплоізоляційні матеріали",
    subtype: "Матеріали теплоізоляційні засипні",
    name: "Пісок для будівельних робіт",
    variants: [{ density: 1600, conductivity: 0.58 }],
  },
  {
    type: "Теплоізоляційні матеріали",
    subtype: "Розчини теплоізоляційні",
    name: "Розчини цементно-перлітові",
    variants: [
      { density: 600, conductivity: 0.23 },
      { density: 800, conductivity: 0.26 },
      { density: 1000, conductivity: 0.3 },
    ],
  },

  {
    type: "Теплоізоляційні матеріали",
    subtype: "Розчини теплоізоляційні",
    name: "Розчини гіпсоперлітові",
    variants: [
      { density: 400, conductivity: 0.15 },
      { density: 500, conductivity: 0.19 },
    ],
  },

  {
    type: "Теплоізоляційні матеріали",
    subtype: "Розчини теплоізоляційні",
    name: "Розчини цементно-кремнезитові",
    variants: [
      { density: 200, conductivity: 0.08 },
      { density: 300, conductivity: 0.09 },
    ],
  },

  {
    type: "Теплоізоляційні матеріали",
    subtype: "Розчини теплоізоляційні",
    name: "Розчини цементно-шлакові",
    variants: [
      { density: 1200, conductivity: 0.58 },
      { density: 1400, conductivity: 0.64 },
    ],
  },

  {
    type: "Теплоізоляційні матеріали",
    subtype: "Розчини теплоізоляційні",
    name: "Розчини цементно-пінополістирольні",
    variants: [{ density: 600, conductivity: 0.17 }],
  },
  {
    type: "Теплоізоляційні матеріали",
    subtype: "Розчини теплоізоляційні",
    name: "Вироби на основі перліту",
    variants: [
      { density: 320, conductivity: 0.095 },
      { density: 330, conductivity: 0.104 },
      { density: 370, conductivity: 0.115 },
      { density: 450, conductivity: 0.14 },
    ],
  },

  {
    type: "Конструкційно-теплоізоляційні матеріали",
    subtype: "Бетони ніздрюваті",
    name: "Бетони ніздрюваті",
    variants: [
      { density: 150, conductivity: 0.06 },
      { density: 300, conductivity: 0.1 },
      { density: 350, conductivity: 0.12 },
      { density: 400, conductivity: 0.13 },
      { density: 500, conductivity: 0.16 },
      { density: 600, conductivity: 0.18 },
      { density: 700, conductivity: 0.27 },
      { density: 800, conductivity: 0.3 },
      { density: 900, conductivity: 0.36 },
      { density: 1000, conductivity: 0.44 },
      { density: 1100, conductivity: 0.51 },
      { density: 1200, conductivity: 0.55 },
    ],
  },

  {
    type: "Конструкційно-теплоізоляційні матеріали",
    subtype: "Бетони ніздрюваті",
    name: "Газо- та пінозолобетон",
    variants: [
      { density: 1000, conductivity: 0.5 },
      { density: 1200, conductivity: 0.58 },
    ],
  },

  {
    type: "Конструкційно-теплоізоляційні матеріали",
    subtype: "Бетони легкі",
    name: "Керамзитобетон на керамзитовому піску",
    variants: [
      { density: 600, conductivity: 0.26 },
      { density: 800, conductivity: 0.31 },
      { density: 1000, conductivity: 0.41 },
      { density: 1200, conductivity: 0.52 },
      { density: 1400, conductivity: 0.65 },
      { density: 1600, conductivity: 0.79 },
      { density: 1800, conductivity: 0.92 },
    ],
  },

  {
    type: "Конструкційно-теплоізоляційні матеріали",
    subtype: "Бетони легкі",
    name: "Керамзитобетон на кварцовому піску з поризацією",
    variants: [
      { density: 800, conductivity: 0.35 },
      { density: 1000, conductivity: 0.47 },
      { density: 1200, conductivity: 0.58 },
    ],
  },

  {
    type: "Конструкційно-теплоізоляційні матеріали",
    subtype: "Бетони легкі",
    name: "Керамзитобетон на перлітовому піску",
    variants: [
      { density: 800, conductivity: 0.35 },
      { density: 1000, conductivity: 0.41 },
    ],
  },

  {
    type: "Конструкційно-теплоізоляційні матеріали",
    subtype: "Бетони легкі",
    name: "Керамзитошлакобетон",
    variants: [{ density: 1000, conductivity: 0.41 }],
  },
  {
    type: "Конструкційно-теплоізоляційні матеріали",
    subtype: "Бетони легкі",
    name: "Перлітобетон",
    variants: [
      { density: 600, conductivity: 0.23 },
      { density: 800, conductivity: 0.33 },
      { density: 1000, conductivity: 0.38 },
      { density: 1200, conductivity: 0.5 },
    ],
  },

  {
    type: "Конструкційно-теплоізоляційні матеріали",
    subtype: "Бетони легкі",
    name: "Шлакопемзобетон",
    variants: [
      { density: 1000, conductivity: 0.37 },
      { density: 1200, conductivity: 0.44 },
      { density: 1400, conductivity: 0.52 },
      { density: 1600, conductivity: 0.63 },
    ],
  },

  {
    type: "Конструкційно-теплоізоляційні матеріали",
    subtype: "Бетони легкі",
    name: "Бетон на доменних гранульованих шлаках",
    variants: [
      { density: 1200, conductivity: 0.52 },
      { density: 1400, conductivity: 0.58 },
      { density: 1600, conductivity: 0.64 },
    ],
  },

  {
    type: "Конструкційно-теплоізоляційні матеріали",
    subtype: "Бетони легкі",
    name: "Бетон на зольному гравії",
    variants: [
      { density: 1000, conductivity: 0.35 },
      { density: 1200, conductivity: 0.47 },
      { density: 1400, conductivity: 0.58 },
    ],
  },

  {
    type: "Конструкційно-теплоізоляційні матеріали",
    subtype: "Вироби гіпсові",
    name: "Плити з гіпсу",
    variants: [
      { density: 1000, conductivity: 0.35 },
      { density: 1200, conductivity: 0.47 },
    ],
  },

  {
    type: "Конструкційно-теплоізоляційні матеріали",
    subtype: "Вироби гіпсові",
    name: "Листи гіпсокартонні",
    variants: [{ density: 800, conductivity: 0.21 }],
  },
  {
    type: "Конструкційно-теплоізоляційні матеріали",
    subtype: "Вироби бетонні",
    name: "Блоки кремнезитоцементні",
    variants: [
      { density: 700, conductivity: 0.23 },
      { density: 800, conductivity: 0.24 },
      { density: 1000, conductivity: 0.27 },
      { density: 1200, conductivity: 0.29 },
    ],
  },

  {
    type: "Конструкційно-теплоізоляційні матеріали",
    subtype: "Деревина та вироби з неї",
    name: "Сосна та ялина поперек волокон",
    variants: [{ density: 500, conductivity: 0.18 }],
  },
  {
    type: "Конструкційно-теплоізоляційні матеріали",
    subtype: "Деревина та вироби з неї",
    name: "Сосна та ялина вздовж волокон",
    variants: [{ density: 500, conductivity: 0.35 }],
  },
  {
    type: "Конструкційно-теплоізоляційні матеріали",
    subtype: "Деревина та вироби з неї",
    name: "Дуб поперек волокон",
    variants: [{ density: 700, conductivity: 0.23 }],
  },
  {
    type: "Конструкційно-теплоізоляційні матеріали",
    subtype: "Деревина та вироби з неї",
    name: "Дуб вздовж волокон",
    variants: [{ density: 700, conductivity: 0.41 }],
  },
  {
    type: "Конструкційно-теплоізоляційні матеріали",
    subtype: "Деревина та вироби з неї",
    name: "Фанера клеєна",
    variants: [{ density: 600, conductivity: 0.18 }],
  },
  {
    type: "Конструкційно-теплоізоляційні матеріали",
    subtype: "Деревина та вироби з неї",
    name: "Картон облицювальний",
    variants: [{ density: 1000, conductivity: 0.23 }],
  },
  {
    type: "Конструкційно-теплоізоляційні матеріали",
    subtype: "Деревина та вироби з неї",
    name: "Картон будівельний багатошаровий",
    variants: [{ density: 650, conductivity: 0.18 }],
  },
  {
    type: "Конструкційно-теплоізоляційні матеріали",
    subtype: "Цегляна кладка з порожнистої цегли",
    name: "Керамічної порожнистої густиною 1 400 кг/м³ (брутто) нацементно-піщаному розчині",
    variants: [{ density: 1600, conductivity: 0.64 }],
  },
  {
    type: "Конструкційно-теплоізоляційні матеріали",
    subtype: "Цегляна кладка з порожнистої цегли",
    name: "Керамічної порожнистої густиною 1 300 кг/м³ (брутто) нацементно-піщаному розчині",
    variants: [{ density: 1400, conductivity: 0.58 }],
  },
  {
    type: "Конструкційно-теплоізоляційні матеріали",
    subtype: "Цегляна кладка з порожнистої цегли",
    name: "Керамічної порожнистої густиною 1 000 кг/м³ (брутто) нацементно-піщаному розчині",
    variants: [{ density: 1200, conductivity: 0.52 }],
  },
  {
    type: "Конструкційно-теплоізоляційні матеріали",
    subtype: "Кладка з виробів бетонних",
    name: "З блоків керамзитошлакобетонних на цементно-піщаному розчинігустиною 800 кг/м³ (брутто)",
    variants: [{ density: 1350, conductivity: 0.43 }],
  },
  {
    type: "Конструкційно-теплоізоляційні матеріали",
    subtype: "Кладка з виробів бетонних",
    name: "З блоків керамзитошлакобетонних на цементно-піщаному розчинігустиною 850 кг/м³ (брутто)",
    variants: [{ density: 1400, conductivity: 0.51 }],
  },
  {
    type: "Конструкційно-теплоізоляційні матеріали",
    subtype: "Кладка з виробів бетонних",
    name: "3 блоків кремнезитоцементних на вапняному розчині із сіопорового такварцового піску",
    variants: [{ density: 400, conductivity: 0.092 }],
  },
  {
    type: "Матеріали конструкційні",
    subtype: "Бетони конструкційні",
    name: "Залізобетон",
    variants: [{ density: 2500, conductivity: 2.04 }],
  },
  {
    type: "Матеріали конструкційні",
    subtype: "Бетони конструкційні",
    name: "Бетон на гравії або щебені з природного каменю",
    variants: [{ density: 2400, conductivity: 1.86 }],
  },
  {
    type: "Матеріали конструкційні",
    subtype: "Розчини будівельні",
    name: "Розчин вапняно-піщаний",
    variants: [{ density: 1600, conductivity: 0.81 }],
  },
  {
    type: "Матеріали конструкційні",
    subtype: "Розчини будівельні",
    name: "Розчин складаний (пісок, вапно, цемент)",
    variants: [{ density: 1700, conductivity: 0.87 }],
  },
  {
    type: "Матеріали конструкційні",
    subtype: "Розчини будівельні",
    name: "Розчин цементно-піщаний",
    variants: [{ density: 1800, conductivity: 0.93 }],
  },
  {
    type: "Матеріали конструкційні",
    subtype: "Облицювання природним каменем та керамічною пликою",
    name: "Плити та вироби з природного каменю: граніт, гнейс та базальт",
    variants: [{ density: 2800, conductivity: 3.49 }],
  },
  {
    type: "Матеріали конструкційні",
    subtype: "Облицювання природним каменем та керамічною пликою",
    name: "Мармур",
    variants: [{ density: 2800, conductivity: 2.91 }],
  },
  {
    type: "Матеріали конструкційні",
    subtype: "Облицювання природним каменем та керамічною пликою",
    name: "Вапняк",
    variants: [
      { density: 1600, conductivity: 0.81 },
      { density: 1800, conductivity: 1.05 },
      { density: 2000, conductivity: 1.28 },
    ],
  },

  {
    type: "Матеріали конструкційні",
    subtype: "Облицювання природним каменем та керамічною пликою",
    name: "Туф",
    variants: [
      { density: 1000, conductivity: 0.29 },
      { density: 1200, conductivity: 0.41 },
      { density: 1400, conductivity: 0.52 },
      { density: 1600, conductivity: 0.64 },
      { density: 1800, conductivity: 0.81 },
      { density: 2000, conductivity: 1.05 },
    ],
  },

  {
    type: "Матеріали конструкційні",
    subtype: "Облицювання природним каменем та керамічною пликою",
    name: "Плити керамічні для підлоги",
    variants: [{ density: 2000, conductivity: 1.1 }],
  },
  {
    type: "Матеріали конструкційні",
    subtype: "Кладка цегляна з повнотілої цегли",
    name: "Керамічної звичайної на цементно-піщаному розчині",
    variants: [{ density: 1800, conductivity: 0.81 }],
  },
  {
    type: "Матеріали конструкційні",
    subtype: "Кладка цегляна з повнотілої цегли",
    name: "Керамічної звичайної на цементно-шлаковому розчині",
    variants: [{ density: 1700, conductivity: 0.76 }],
  },
  {
    type: "Матеріали конструкційні",
    subtype: "Кладка цегляна з повнотілої цегли",
    name: "Керамічної звичайної на цементно-перлітовому розчині",
    variants: [{ density: 1600, conductivity: 0.7 }],
  },
  {
    type: "Матеріали конструкційні",
    subtype: "Кладка цегляна з повнотілої цегли",
    name: "Силікатної на цементно-піщаному розчині",
    variants: [{ density: 1800, conductivity: 0.87 }],
  },
  {
    type: "Матеріали конструкційні",
    subtype: "Кладка цегляна з повнотілої цегли",
    name: "Трепельної на цементно-піщаному розчині",
    variants: [
      { density: 1000, conductivity: 0.47 },
      { density: 1200, conductivity: 0.52 },
    ],
  },

  {
    type: "Матеріали конструкційні",
    subtype: "Кладка цегляна з повнотілої цегли",
    name: "Шлакової на цементно-піщаному розчині",
    variants: [{ density: 1500, conductivity: 0.7 }],
  },
  {
    type: "Матеріали конструкційні",
    subtype:
      "Матеріали покрівельні, гідроізоляційні, пароізоляційні та покриттяполімерні для підлог",
    name: "Листи азбестоцементні",
    variants: [
      { density: 1600, conductivity: 0.41 },
      { density: 1800, conductivity: 0.52 },
    ],
  },

  {
    type: "Матеріали конструкційні",
    subtype:
      "Матеріали покрівельні, гідроізоляційні, пароізоляційні та покриттяполімерні для підлог",
    name: "Матеріали бітумні, бітумно-полімерні покрівельні та гідроізоляційні",
    variants: [
      { density: 1000, conductivity: 0.17 },
      { density: 1200, conductivity: 0.22 },
      { density: 1400, conductivity: 0.27 },
    ],
  },

  {
    type: "Матеріали конструкційні",
    subtype:
      "Матеріали покрівельні, гідроізоляційні, пароізоляційні та покриттяполімерні для підлог",
    name: "Асфальтобетон",
    variants: [{ density: 2100, conductivity: 1.05 }],
  },
  {
    type: "Матеріали конструкційні",
    subtype:
      "Матеріали покрівельні, гідроізоляційні, пароізоляційні та покриттяполімерні для підлог",
    name: "Руберойд, пергамін",
    variants: [{ density: 1000, conductivity: 0.17 }],
  },
  {
    type: "Матеріали конструкційні",
    subtype:
      "Матеріали покрівельні, гідроізоляційні, пароізоляційні та покриттяполімерні для підлог",
    name: "Мембрана ПВХ",
    variants: [{ density: 1000, conductivity: 0.23 }],
  },
  {
    type: "Матеріали конструкційні",
    subtype:
      "Матеріали покрівельні, гідроізоляційні, пароізоляційні та покриттяполімерні для підлог",
    name: "Пароізоляційна плівка",
    variants: [{ density: 1600, conductivity: 0.3 }],
  },
  {
    type: "Матеріали конструкційні",
    subtype:
      "Матеріали покрівельні, гідроізоляційні, пароізоляційні та покриттяполімерні для підлог",
    name: "Лінолеум полівінілхлоридний на теплоізоляційній підоснові",
    variants: [
      { density: 1600, conductivity: 0.33 },
      { density: 1800, conductivity: 0.38 },
    ],
  },

  {
    type: "Матеріали конструкційні",
    subtype:
      "Матеріали покрівельні, гідроізоляційні, пароізоляційні та покриттяполімерні для підлог",
    name: "Лінолеум полівінілхлоридний на тканинній основі",
    variants: [
      { density: 1400, conductivity: 0.23 },
      { density: 1600, conductivity: 0.29 },
    ],
  },

  {
    type: "Матеріали конструкційні",
    subtype:
      "Матеріали покрівельні, гідроізоляційні, пароізоляційні та покриттяполімерні для підлог",
    name: "Лінолеум полівінілхлоридний багатошаровий та одношаровий безпідоснови",
    variants: [
      { density: 800, conductivity: 0.17 },
      { density: 1200, conductivity: 0.21 },
    ],
  },

  {
    type: "Матеріали конструкційні",
    subtype: "Метали та скло",
    name: "Сталь арматурна",
    variants: [{ density: 7850, conductivity: 58 }],
  },
  {
    type: "Матеріали конструкційні",
    subtype: "Метали та скло",
    name: "Чавун",
    variants: [{ density: 7200, conductivity: 50 }],
  },
  {
    type: "Матеріали конструкційні",
    subtype: "Метали та скло",
    name: "Алюміній",
    variants: [{ density: 2600, conductivity: 221 }],
  },
  {
    type: "Матеріали конструкційні",
    subtype: "Метали та скло",
    name: "Латунь, мідь",
    variants: [{ density: 8500, conductivity: 407 }],
  },
  {
    type: "Матеріали конструкційні",
    subtype: "Метали та скло",
    name: "Скло віконне",
    variants: [{ density: 2500, conductivity: 0.76 }],
  },
];

export default materials;
