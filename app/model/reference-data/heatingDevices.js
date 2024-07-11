const heatingDevices = [
  {
    lower: 0,
    upper: 4,
    heatingDevices: [
      {
        type: "Радіатори",
        subtype: "Встановлені біля внутрішньої стіни",
        verticalTemperatureProfileEfficiency: 0.87,
      },
      {
        type: "Радіатори",
        subtype: "Встановлені біля зовнішньої стіни",
        verticalTemperatureProfileEfficiency: 0.95,
      },
      {
        type: "Радіатори",
        subtype: "Встановлені під вікном без радіаційного захисту",
        verticalTemperatureProfileEfficiency: 0.83,
      },
      {
        type: "Радіатори",
        subtype: "Встановлені під вікном з радіаційним захистом",
        verticalTemperatureProfileEfficiency: 0.88,
      },
      {
        type: "Теплі підлоги",
        subtype: "З вологою підлогою",
        verticalTemperatureProfileEfficiency: 0.955,
      },
      {
        type: "Теплі підлоги",
        subtype: "З сухою підлогою",
        verticalTemperatureProfileEfficiency: 0.965,
      },
      {
        type: "Теплі підлоги",
        subtype: "З сухою підлогою та незначним покриттям",
        verticalTemperatureProfileEfficiency: 0.94,
      },
      {
        type: "Стельові променеві обігрівачі",
        verticalTemperatureProfileEfficiency: 0.935,
      },
    ],
  },
  {
    lower: 4,
    upper: 6,
    heatingDevices: [
      { type: "Радіатори", verticalTemperatureProfileEfficiency: 0.98 },
      {
        type: "Тепловентилятори без додаткової вертикальної рециркуляції",
        subtype: "Горизонтальне витікання",
        verticalTemperatureProfileEfficiency: 0.98,
      },
      {
        type: "Тепловентилятори з додатковою вертикальною рециркуляцією",
        subtype: "Вертикальне витікання",
        verticalTemperatureProfileEfficiency: 0.99,
      },
      {
        type: "Тепловентилятори без додаткової вертикальної рециркуляції",
        subtype: "Горизонтальне витікання",
        verticalTemperatureProfileEfficiency: 0.99,
      },
      {
        type: "Тепловентилятори без додаткової вертикальної рециркуляції",
        subtype: "Вертикальне витікання",
        verticalTemperatureProfileEfficiency: 0.99,
      },
      {
        type: "Стельові променеві обігрівачі",
        verticalTemperatureProfileEfficiency: 1,
      },
      { type: "Теплі підлоги", verticalTemperatureProfileEfficiency: 1 },
    ],
  },
  {
    lower: 6,
    upper: 8,
    heatingDevices: [
      { type: "Радіатори", verticalTemperatureProfileEfficiency: 0.94 },
      {
        type: "Тепловентилятори без додаткової вертикальної рециркуляції",
        subtype: "Горизонтальне витікання",
        verticalTemperatureProfileEfficiency: 0.94,
      },
      {
        type: "Тепловентилятори з додатковою вертикальною рециркуляцією",
        subtype: "Вертикальне витікання",
        verticalTemperatureProfileEfficiency: 0.96,
      },
      {
        type: "Тепловентилятори без додаткової вертикальної рециркуляції",
        subtype: "горизонтальне витікання",
        verticalTemperatureProfileEfficiency: 0.97,
      },
      {
        type: "Тепловентилятори без додаткової вертикальної рециркуляції",
        subtype: "Вертикальне витікання",
        verticalTemperatureProfileEfficiency: 0.98,
      },
      {
        type: "Стельові променеві обігрівачі",
        verticalTemperatureProfileEfficiency: 0.99,
      },
      { type: "Теплі підлоги", verticalTemperatureProfileEfficiency: 0.99 },
    ],
  },
  {
    lower: 8,
    upper: 10,
    heatingDevices: [
      { type: "Радіатори", verticalTemperatureProfileEfficiency: 0.88 },
      {
        type: "Тепловентилятори без додаткової вертикальної рециркуляції",
        subtype: "Горизонтальне витікання",
        verticalTemperatureProfileEfficiency: 0.88,
      },
      {
        type: "Тепловентилятори з додатковою вертикальною рециркуляцією",
        subtype: "Вертикальне витікання",
        verticalTemperatureProfileEfficiency: 0.91,
      },
      {
        type: "Тепловентилятори без додаткової вертикальної рециркуляції",
        subtype: "Горизонтальне витікання",
        verticalTemperatureProfileEfficiency: 0.94,
      },
      {
        type: "Тепловентилятори без додаткової вертикальної рециркуляції",
        subtype: "Вертикальне витікання",
        verticalTemperatureProfileEfficiency: 0.96,
      },
      {
        type: "Стельові променеві обігрівачі",
        verticalTemperatureProfileEfficiency: 0.97,
      },
      { type: "Теплі підлоги", verticalTemperatureProfileEfficiency: 0.97 },
    ],
  },
  {
    lower: 10,
    upper: 12,
    heatingDevices: [
      { type: "Радіатори", verticalTemperatureProfileEfficiency: 0.83 },
      {
        type: "Тепловентилятори без додаткової вертикальної рециркуляції",
        subtype: "Горизонтальне витікання",
        verticalTemperatureProfileEfficiency: 0.83,
      },
      {
        type: "Тепловентилятори з додатковою вертикальною рециркуляцією",
        subtype: "Вертикальне витікання",
        verticalTemperatureProfileEfficiency: 0.87,
      },
      {
        type: "Тепловентилятори без додаткової вертикальної рециркуляції",
        subtype: "Горизонтальне витікання",
        verticalTemperatureProfileEfficiency: 0.91,
      },
      {
        type: "Тепловентилятори без додаткової вертикальної рециркуляції",
        subtype: "Вертикальне витікання",
        verticalTemperatureProfileEfficiency: 0.93,
      },
      {
        type: "Стельові променеві обігрівачі",
        verticalTemperatureProfileEfficiency: 0.96,
      },
      { type: "Теплі підлоги", verticalTemperatureProfileEfficiency: 0.96 },
    ],
  },
  {
    lower: 12,
    upper: 15,
    heatingDevices: [
      {
        type: "Тепловентилятори без додаткової вертикальної рециркуляції",
        subtype: "Горизонтальне витікання",
        verticalTemperatureProfileEfficiency: 0.78,
      },
      {
        type: "Тепловентилятори з додатковою вертикальною рециркуляцією",
        subtype: "Вертикальне витікання",
        verticalTemperatureProfileEfficiency: 0.84,
      },
      {
        type: "Тепловентилятори без додаткової вертикальної рециркуляції",
        subtype: "Горизонтальне витікання",
        verticalTemperatureProfileEfficiency: 0.88,
      },
      {
        type: "Тепловентилятори без додаткової вертикальної рециркуляції",
        subtype: "Вертикальне витікання",
        verticalTemperatureProfileEfficiency: 0.91,
      },
      {
        type: "Стельові променеві обігрівачі",
        verticalTemperatureProfileEfficiency: 0.94,
      },
      { type: "Теплі підлоги", verticalTemperatureProfileEfficiency: 0.94 },
    ],
  },
  {
    lower: 15,
    upper: 20,
    heatingDevices: [
      {
        type: "Тепловентилятори без додаткової вертикальної рециркуляції",
        subtype: "Горизонтальне витікання",
        verticalTemperatureProfileEfficiency: 0.72,
      },
      {
        type: "Тепловентилятори з додатковою вертикальною рециркуляцією",
        subtype: "Вертикальне витікання",
        verticalTemperatureProfileEfficiency: 0.78,
      },
      {
        type: "Тепловентилятори без додаткової вертикальної рециркуляції",
        subtype: "Горизонтальне витікання",
        verticalTemperatureProfileEfficiency: 0.84,
      },
      {
        type: "Тепловентилятори без додаткової вертикальної рециркуляції",
        subtype: "Вертикальне витікання",
        verticalTemperatureProfileEfficiency: 0.88,
      },
      {
        type: "Стельові променеві обігрівачі",
        verticalTemperatureProfileEfficiency: 0.92,
      },
      { type: "Теплі підлоги", verticalTemperatureProfileEfficiency: 0.92 },
    ],
  },
  {
    lower: 20,
    upper: Infinity,
    heatingDevices: [
      {
        type: "Тепловентилятори без додаткової вертикальної рециркуляції",
        subtype: "Горизонтальне витікання",
        verticalTemperatureProfileEfficiency: 0.63,
      },
      {
        type: "Тепловентилятори з додатковою вертикальною рециркуляцією",
        subtype: "Вертикальне витікання",
        verticalTemperatureProfileEfficiency: 0.71,
      },
      {
        type: "Тепловентилятори без додаткової вертикальної рециркуляції",
        subtype: "Горизонтальне витікання",
        verticalTemperatureProfileEfficiency: 0.77,
      },
      {
        type: "Тепловентилятори без додаткової вертикальної рециркуляції",
        subtype: "Вертикальне витікання",
        verticalTemperatureProfileEfficiency: 0.83,
      },
      {
        type: "Стельові променеві обігрівачі",
        verticalTemperatureProfileEfficiency: 0.89,
      },
      { type: "Теплі підлоги", verticalTemperatureProfileEfficiency: 0.89 },
    ],
  },
];

export default heatingDevices;
