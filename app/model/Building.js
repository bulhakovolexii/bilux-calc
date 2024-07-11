import Ceiling from "./constructions/Ceiling";
import Floor from "./constructions/Floor";
import Wall from "./constructions/Wall";
import citiesClimateData from "./reference-data/citiesClimateData";
import constructionTypes from "./reference-data/constructionTypes";
import controlTypes from "./reference-data/controlTypes";
import heatCapacityClasses from "./reference-data/heatCapacityClasses";
import heatGenerators from "./reference-data/heatGenerators";
import heatingDevices from "./reference-data/heatingDevices";
import monthlyDurationIntervals from "./reference-data/monthlyDurationIntervals";
import purposes from "./reference-data/purposes";
import systemTypes from "./reference-data/systemTypes";
import temperatureGradients from "./reference-data/temperatureGradients";

export default class Building {
  static AIR_HEAT_CAPACITY = 0.336; // Теплоємність одиниці обʼєму повітря
  static INTERNAL_BARRIER_COEFFICIENT = 0.85; // Коефіцієнт зниження обʼєму повітря в будівлі, яким враховують наявність внутрішніх огороджувальних конструкцій
  static BASEMENT_AIR_TEMPERATURE = 13; // Температура повітря в неопалюваному підвалі

  constructor(inputData) {
    // Step 1
    this.city = inputData.city; // Місто розташування будівлі
    this.terrain = inputData.terrain; // Характеристика місцевості
    // Step 2
    this.purpose = inputData.purpose; // Функційне призначення будівлі
    this.indoorTemperature = purposes.find(
      (option) => option.purpose === this.purpose
    ).indoorTemperature;
    this.heatCapacityClass = inputData.heatCapacityClass; // Клас внутрішньої теплоємності будівлі
    this.airPermeabilityClass = inputData.airPermeabilityClass; // Клас повітропроникності конструкцій будівлі
    this.constructionType = inputData.constructionType; // Тип і стан стінових конструкцій
    // Step 3
    this.buildingWidth = parseFloat(inputData.buildingWidth); // Ширина будівлі
    this.buildingLength = parseFloat(inputData.buildingLength); // Довжина будівлі
    this.floorHeight = parseFloat(inputData.floorHeight); // Висота поверху
    this.numberOfFloors = parseInt(inputData.numberOfFloors); // Кількість поверхів
    // Step 5
    this.facades = inputData.facades.map((facade) => {
      if (facade.direction === "north" || facade.direction === "south") {
        return new Wall({
          ...facade,
          width: this.buildingWidth,
          height: this.height(),
          buildingHeight: this.height(),
          indoorTemperature: this.indoorTemperature,
          buildingPurpose: this.purpose,
          climateData: this.climateData(),
          terrain: this.terrain,
          airPermeabilityClass: this.airPermeabilityClass,
        });
      } else if (facade.direction === "east" || facade.direction === "west") {
        return new Wall({
          ...facade,
          width: this.buildingLength,
          height: this.height(),
          buildingHeight: this.height(),
          indoorTemperature: this.indoorTemperature,
          buildingPurpose: this.purpose,
          climateData: this.climateData(),
          terrain: this.terrain,
          airPermeabilityClass: this.airPermeabilityClass,
        });
      }
    });
    // Step 4.1
    this.floor = new Floor({
      ...inputData.floor,
      width: this.buildingWidth,
      height: this.buildingLength,
      wallTotalThickness: this.wallTotalThickness(),
    });
    // Step 4.2
    this.ceiling = new Ceiling({
      ...inputData.ceiling,
      width: this.buildingWidth,
      height: this.buildingLength,
    });
    // Step 6
    this.system = { ...inputData.system };
  }

  // Висота будівлі
  height() {
    return this.floorHeight * this.numberOfFloors;
  }

  // Кондиціонована площа будівлі
  conditionedArea() {
    return this.buildingWidth * this.buildingLength * this.numberOfFloors;
  }

  // Кондиціонований обʼєм будівлі
  conditionedVolume() {
    return this.buildingWidth * this.buildingLength * this.height();
  }

  // Загальна товщина зовнішньої стіни
  wallTotalThickness() {
    const wallThickness = [];
    this.facades.forEach((facade) =>
      wallThickness.push(
        facade.layers.reduce((sum, layer) => sum + layer.thickness, 0)
      )
    );
    return Math.max(...wallThickness);
  }

  // Кліматичні дані для обраного міста
  climateData() {
    const climateData = citiesClimateData.find(
      (climateData) => climateData.city === this.city
    );

    return climateData;
  }

  // Середньомісячна температура навколишнього середовища
  outdoorTemperature(month) {
    const monthlyTemperatures = this.climateData().monthlyTemperatures;
    const monthIndex = monthlyDurationIntervals.indexOf(month);

    return monthlyTemperatures[monthIndex];
  }

  // Тривалість опалювального періоду
  heatingPeriodDurationHours(month) {
    let period;

    if (
      this.purpose === "Будівлі навчальних закладів" ||
      this.purpose === "Будівлі дитячих навчальних закладів" ||
      this.purpose === "Будівлі закладів охорони здоровʼя"
    ) {
      period = this.climateData().heatingPeriodDates.below10;
    } else {
      period = this.climateData().heatingPeriodDates.below8;
    }

    let hours;

    if (
      monthlyDurationIntervals.indexOf(month) < period.end[1] - 1 ||
      monthlyDurationIntervals.indexOf(month) > period.start[1] - 1
    ) {
      hours = month.hours;
    } else if (monthlyDurationIntervals.indexOf(month) === period.end[1] - 1) {
      hours = period.end[0] * 24;
    } else if (
      monthlyDurationIntervals.indexOf(month) ===
      period.start[1] - 1
    ) {
      hours = month.hours - period.start[0] * 24;
    } else {
      hours = 0;
    }
    return hours;
  }

  // Енергопотреба (обмежена тривалістю опалювального періоду)
  energyDemand(month) {
    const energyDemand =
      this.totalHeatLosses(month) -
      this.utilizationFactor(month) * this.totalHeatGains(month);

    if (energyDemand > 0) {
      return (
        (energyDemand *
          (this.heatingPeriodDurationHours(month) / month.hours)) /
        1000
      );
    } else {
      return 0;
    }
  }

  // Загальні тепловтрати
  totalHeatLosses(month) {
    return (
      this.transmissionHeatLosses(month) + this.ventilationHeatLosses(month)
    );
  }

  // Тепловтрати трансмісією
  transmissionHeatLosses(month) {
    return (
      this.overallTransmissionHeatTransferCoefficient() *
      (this.indoorTemperature - this.outdoorTemperature(month)) *
      month.hours
    );
  }

  // Узагальнений коефіцієнт теплопередачі трансмісією
  overallTransmissionHeatTransferCoefficient() {
    return (
      this.ceiling.heatTransferCoefficient() +
      this.floor.heatTransferCoefficient() +
      this.facades.reduce(
        (sum, facade) => sum + facade.heatTransferCoefficient(),
        0
      )
    );
  }

  // Тепловтрати вентиляцією
  ventilationHeatLosses(month) {
    return (
      this.overallVentilationHeatTransferCoefficient() *
      (this.indoorTemperature - this.outdoorTemperature(month)) *
      month.hours
    );
  }

  // Узагальнений коефіцієнт теплопередачі вентиляцією
  overallVentilationHeatTransferCoefficient() {
    return Building.AIR_HEAT_CAPACITY * this.infiltrationAirFlowRate();
  }

  // Витрата повітря за рахунок інфільтрації
  infiltrationAirFlowRate() {
    return (
      this.infiltrationAirExchangeRate() *
      this.conditionedVolume() *
      Building.INTERNAL_BARRIER_COEFFICIENT
    );
  }

  // Кратність повітрообміну за рахунок інфільтрації
  infiltrationAirExchangeRate() {
    return (
      this.facades.reduce(
        (sum, facade) =>
          sum + facade.adjustedAirflow(this.airLeakageAdjustmentFactor()),
        0
      ) /
      (this.conditionedVolume() * Building.INTERNAL_BARRIER_COEFFICIENT)
    );
  }

  // Коефіцієнт, що враховує витрату повітря через глухі стінові конструкції
  airLeakageAdjustmentFactor() {
    const constructionType = constructionTypes.find(
      (type) => type.constructionType === this.constructionType
    );

    return constructionType.airLeakageAdjustmentFactor;
  }

  // Теплонадходження
  totalHeatGains(month) {
    return this.internalHeatGains(month) + this.solarHeatGains(month);
  }

  // Внутрішні теплонадходження
  internalHeatGains(month) {
    return (
      (this.usageHoursPerWeek() / 168) *
      (this.gainsFromMetabolicHeat() +
        this.gainsFromLighting() +
        this.gainsFromEquipment()) *
      this.conditionedArea() *
      month.hours
    );
  }

  // Графік використання
  usageHoursPerWeek() {
    return purposes.find((option) => option.purpose === this.purpose)
      .usageHoursPerWeek;
  }

  // Тепловий потік від людей
  gainsFromMetabolicHeat() {
    return purposes.find((option) => option.purpose === this.purpose)
      .gainsFromMetabolicHeat;
  }

  // Тепловий потік від освітлення
  gainsFromLighting() {
    return purposes.find((option) => option.purpose === this.purpose)
      .gainsFromLighting;
  }

  // Тепловий потік від обладнання
  gainsFromEquipment() {
    return purposes.find((option) => option.purpose === this.purpose)
      .gainsFromEquipment;
  }

  // Сонячні теплонадходження
  solarHeatGains(month) {
    const solarRadiation =
      this.climateData().solarRadiation[
        monthlyDurationIntervals.indexOf(month)
      ];

    return (
      month.hours *
      this.facades.reduce(
        (sum, facade) =>
          sum +
          facade.windows.reduce(
            (sum, window) => sum + window.solarHeatGains(solarRadiation),
            0
          ),
        0
      )
    );
  }

  // Коефіцієнт використання надходжень
  utilizationFactor(month) {
    if (
      this.heatGainLossRatio(month) > 0 &&
      this.heatGainLossRatio(month) !== 1
    ) {
      return (
        (1 - this.heatGainLossRatio(month) ** this.timeConstantFactor()) /
        (1 - this.heatGainLossRatio(month) ** (this.timeConstantFactor() + 1))
      );
    } else if (this.heatGainLossRatio(month) === 1) {
      return this.timeConstantFactor() / (this.timeConstantFactor() + 1);
    } else if (
      this.heatGainLossRatio(month) < 0 &&
      this.totalHeatGains(month) > 0
    ) {
      return 1 / this.heatGainLossRatio(month);
    } else if (
      this.heatGainLossRatio(month) <= 0 &&
      this.totalHeatGains(month) <= 0
    ) {
      return 1;
    } else {
      return 0;
    }
  }

  // Внутрішня теплоємність
  buildingThermalCapacity() {
    return (
      heatCapacityClasses.find(
        (option) => option.heatCapacityClass === this.heatCapacityClass
      ).heatCapacity * this.conditionedArea()
    );
  }

  // Безрозмірне співвідношення надходжень і втрат теплоти
  heatGainLossRatio(month) {
    console.log();
    return this.totalHeatLosses(month) !== 0
      ? this.totalHeatGains(month) / this.totalHeatLosses(month)
      : Number.MAX_SAFE_INTEGER;
  }

  // Часова константа
  buildingTimeConstant() {
    return (
      this.buildingThermalCapacity() /
      (this.overallTransmissionHeatTransferCoefficient() +
        this.overallVentilationHeatTransferCoefficient())
    );
  }

  // Безрозмірний числовий параметр, що залежить від часової константи
  timeConstantFactor() {
    return 1 + this.buildingTimeConstant() / 15;
  }

  // Енергоспоживання
  energyConsumption(month) {
    const heatEmissionSubsystemInputEnergy =
      this.energyDemand(month) + this.totalHeatEmissionSubsystemLosses(month);
    const distributionSubsystemInputEnergy =
      this.nonRecoveredHeatLosses(month) + heatEmissionSubsystemInputEnergy;
    const totalHeatLossEmissionSubsystem =
      (distributionSubsystemInputEnergy *
        (1 - this.heatGeneratorEfficiency())) /
      this.heatGeneratorEfficiency();

    return distributionSubsystemInputEnergy + totalHeatLossEmissionSubsystem;
  }

  // Характеристики  теплогенератора
  heatGenerator() {
    return heatGenerators.find(
      (option) => option.heatGenerator === this.system.heatGenerator
    );
  }

  // ККД теплогенератора
  heatGeneratorEfficiency() {
    return this.heatGenerator().efficiency / 100;
  }

  // Неутилізовані тепловтрати
  nonRecoveredHeatLosses(month) {
    return (
      this.nonRecoverableHeatLosses(month) +
      (this.recoverableHeatLosses(month) - this.recoveredHeatLosses(month))
    );
  }

  // Тепловтрати трубопроводів в неопалюваних обʼємах
  nonRecoverableHeatLosses(month) {
    if (this.floor.type === "Технічне підпілля") {
      return this.distributionSubsystemHeatLosses(
        this.pipesLength().sectionV,
        this.heatCarrierTemperature(month),
        Building.BASEMENT_AIR_TEMPERATURE,
        this.pipesHeatTransferCoefficient().sectionV,
        month
      ); // Тепловтрати підсистеми розподілення (тільки для труб в підпіллі)
    } else {
      return 0;
    }
  }

  // Тепловтрати трубопроводів в опалюваних обʼємах
  recoverableHeatLosses(month) {
    const losses = (section) => {
      return this.distributionSubsystemHeatLosses(
        this.pipesLength()[section],
        this.heatCarrierTemperature(month),
        this.indoorTemperature,
        this.pipesHeatTransferCoefficient()[section],
        month
      );
    };
    if (this.floor.type !== "Технічне підпілля") {
      const pipes = ["sectionV", "sectionS", "sectionA"];
      return pipes.reduce((sum, pipe) => sum + losses(pipe), 0); // Тепловтрати підсистеми розподілення (для всіх труб)
    } else {
      const pipes = ["sectionS", "sectionA"];
      return pipes.reduce((sum, pipe) => sum + losses(pipe), 0); // Тепловтрати підсистеми розподілення (для всіх труб окрім труб в підпіллі)
    }
  }

  // Тепловтрати підсистеми розподілення
  distributionSubsystemHeatLosses(
    pipeLength,
    heatCarrierTemperature,
    environmentTemperature,
    pipeHeatTransferCoefficient,
    month
  ) {
    return (
      pipeHeatTransferCoefficient *
      (heatCarrierTemperature - environmentTemperature) *
      pipeLength *
      this.heatingPeriodDurationHours(month)
    );
  }

  // Довжини трубопроводів
  pipesLength() {
    const pipesLength = { sectionV: 0, sectionS: 0, sectionA: 0 };
    const system = this.system.type;
    const width = this.buildingWidth;
    const length = this.buildingLength;
    const height = this.floorHeight;
    const floors = this.numberOfFloors;

    if (system === "Двотрубна") {
      pipesLength.sectionV =
        2 * length + 0.01625 * length * this.buildingWidth ** 2;
      pipesLength.sectionS = 0.025 * length * width * height * floors;
      pipesLength.sectionA = 0.55 * length * width * floors;
    } else if (
      system === "Однотрубна (постійний гідравлічний режим)" ||
      system === "Однотрубна (змінний гідравлічний режим)"
    ) {
      pipesLength.sectionV = 2 * length + 0.0325 * length * width + 6;
      pipesLength.sectionS =
        0.025 * length * width * height * floors +
        2 * (length + width) * floors;
      pipesLength.sectionA = 0.1 * length * width * floors;
    }

    return pipesLength;
  }

  // Температура теплоносія
  heatCarrierTemperature(month) {
    let supplyTemp = this.indoorTemperature;
    let returnTemp = this.indoorTemperature;
    if (this.heatGenerator().isHydraulic) {
      supplyTemp = this.temperatureGradient().supply; // Температура подавального теплоносія
      returnTemp = this.temperatureGradient().return; // Температура зворотного теплоносія
    }
    const x1 = this.indoorTemperature; // Максимальна температура повітря
    const y1 = this.indoorTemperature; // Мінімальна температура теплоносія
    const x2 = -23; // Мінімальна температура повітря
    const y2 = returnTemp + (supplyTemp - returnTemp) / 2; // Максимальна температура теплоносія

    // Коефіцієнти лінійної функції температурного графіку
    const a = (y2 - y1) / (x2 - x1);
    const b = y1 - a * x1;
    const heatCarrierTemperature = (x) => a * x + b;

    return heatCarrierTemperature(this.outdoorTemperature(month));
  }

  // Температурний графік
  temperatureGradient() {
    return temperatureGradients.find(
      (option) => option.temperatureGradient === this.system.temperatureGradient
    );
  }

  // Лінійний коефіцієнт теплопередачі трубопроводів
  pipesHeatTransferCoefficient() {
    const area = this.conditionedArea();

    switch (this.system.pipesInsulation) {
      case true:
        return { sectionV: 0.0002, sectionS: 0.0003, sectionA: 0.0004 };
      case false:
        if (area <= 200) {
          return { sectionV: 0.001, sectionS: 0.001, sectionA: 0.001 };
        } else if (area < 200 && area <= 500) {
          return { sectionV: 0.002, sectionS: 0.002, sectionA: 0.002 };
        } else {
          return { sectionV: 0.003, sectionS: 0.003, sectionA: 0.003 };
        }
      default:
        return { sectionV: 0, sectionS: 0, sectionA: 0 };
    }
  }

  // Втрати що підлягають утилізації
  recoveredHeatLosses(month) {
    return (
      this.recoverableHeatLosses(month) * 0.9 * this.utilizationFactor(month)
    );
  }

  // Утилізовані тепловтрати
  totalHeatEmissionSubsystemLosses(month) {
    return (
      ((this.hydraulicBalancingCoefficient() *
        this.radiantHeatFluxCoefficient()) /
        this.overallHeatEmissionEfficiency() -
        1) *
      this.energyDemand(month)
    );
  }

  // Коефіцієнт гідравлічного налагодження системи
  hydraulicBalancingCoefficient() {
    let hydraulicAdjustmentCoefficient = 1;
    if (this.heatGenerator().isHydraulic) {
      return systemTypes.find(
        (system) =>
          system.type === this.system.type &&
          system.hydraulicAdjustment === this.system.hydraulicAdjustment
      ).hydraulicAdjustmentCoefficient;
    }
    return hydraulicAdjustmentCoefficient;
  }

  // Коефіцієнт променевої складової теплового потоку
  radiantHeatFluxCoefficient() {
    if (
      this.floorHeight > 4 &&
      this.system.heatingDevices.type === "Стельові променеві обігрівачі"
    ) {
      return 0.85;
    } else {
      return 1;
    }
  }

  // Загальний рівень ефективності для тепловіддавальної складової системи
  overallHeatEmissionEfficiency() {
    return (
      1 /
      (4 -
        (this.verticalTemperatureProfileEfficiency() +
          this.temperatureControlEfficiency() +
          1))
    );
  }

  // Складова загального рівня ефективності, яка враховує вертикальний профіль температури повітря приміщення
  verticalTemperatureProfileEfficiency() {
    const floorHeight = this.floorHeight;

    const devices = heatingDevices.find(
      (height) => floorHeight > height.lower && floorHeight <= height.upper
    ).heatingDevices;

    const verticalTemperatureProfileEfficiency = devices.find((device) => {
      if (this.system.heatingDevices.subtype && device.subtype) {
        return (
          device.type === this.system.heatingDevices.type &&
          device.subtype === this.system.heatingDevices.subtype
        );
      } else {
        return device.type === this.system.heatingDevices.type;
      }
    }).verticalTemperatureProfileEfficiency;

    if (
      floorHeight <= 4 &&
      this.system.heatingDevices.type === "Радіатори" &&
      this.heatGenerator().isHydraulic
    ) {
      return (
        (verticalTemperatureProfileEfficiency +
          this.temperatureGradient().verticalTemperatureProfileEfficiency) /
        2
      );
    } else {
      return verticalTemperatureProfileEfficiency;
    }
  }

  // Складова загального рівня ефективності, яка враховує регулювання температури приміщення
  temperatureControlEfficiency() {
    return controlTypes.find((type) => this.system.controlType === type.type)
      .temperatureControlEfficiency;
  }

  // Встановлення альтернативної внутрішньої температури
  setIndoorTemperature(newTemp) {
    this.indoorTemperature = newTemp;
  }
  // Необхідна встановлена потужність теплогенератора
  estimatedHeatGeneratorPower(outdoorTemperature) {
    return (
      (this.overallTransmissionHeatTransferCoefficient() *
        (this.indoorTemperature - outdoorTemperature) +
        this.overallVentilationHeatTransferCoefficient() *
          (this.indoorTemperature - outdoorTemperature)) /
      1000
    );
  }
}
