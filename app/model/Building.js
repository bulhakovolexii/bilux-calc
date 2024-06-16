import Ceiling from "./constructions/Ceiling";
import Floor from "./constructions/Floor";
import Wall from "./constructions/Wall";
import citiesClimateData from "./reference-data/citiesClimateData";
import constructionTypes from "./reference-data/constructionTypes";
import heatCapacityClasses from "./reference-data/heatCapacityClasses";
import monthlyDurationIntervals from "./reference-data/monthlyDurationIntervals";
import purposes from "./reference-data/purposes";

export default class Building {
  static AIR_HEAT_CAPACITY = 0.336; // Теплоємність одиниці обʼєму повітря
  static INTERNAL_BARRIER_COEFFICIENT = 0.85; // Коефіцієнт зниження обʼєму повітря в будівлі, яким враховують наявність внутрішніх огороджувальних конструкцій

  constructor(inputData) {
    // Step 1
    this.city = inputData.city; // Місто розташування будівлі
    this.terrain = inputData.terrain; // Характеристика місцевості
    // Step 2
    this.purpose = inputData.purpose; // Функційне призначення будівлі
    this.heatCapacityClass = inputData.heatCapacityClass; // Клас внутрішньої теплоємності будівлі
    this.airPermeabilityClass = inputData.airPermeabilityClass; // Клас повітропроникності конструкцій будівлі
    this.constructionType = inputData.constructionType; // Тип і стан стінових конструкцій
    // Step 3
    this.buildingWidth = parseFloat(inputData.buildingWidth); // Ширина будівлі
    this.buildingLength = parseFloat(inputData.buildingLength); // Довжина будівлі
    this.floorHeight = parseFloat(inputData.floorHeight); // Висота поверху
    this.numberOfFloors = parseInt(inputData.numberOfFloors); // Кількість поверхів
    // Step 4
    this.ceiling = new Ceiling({
      ...inputData.ceiling,
      width: this.buildingWidth,
      height: this.buildingLength,
    });
    this.floor = new Floor({
      ...inputData.floor,
      width: this.buildingWidth,
      height: this.buildingLength,
    });
    this.facades = inputData.facades.map((facade) => {
      if (facade.direction === "north" || facade.direction === "south") {
        return new Wall({
          ...facade,
          city: this.city,
          width: this.buildingWidth,
          height: this.height(),
          buildingHeight: this.height(),
          phi_int_set: this.indoorTemperature(),
          buildingPurpose: this.purpose,
          typeOfArea: this.terrain,
          airtightness: this.airPermeabilityClass,
        });
      } else {
        return new Wall({
          ...facade,
          city: this.city,
          width: this.buildingLength,
          height: this.height(),
          buildingHeight: this.height(),
          phi_int_set: this.indoorTemperature(),
          buildingPurpose: this.purpose,
          typeOfArea: this.terrain,
          airtightness: this.airPermeabilityClass,
        });
      }
    });
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

  // Внутрішня температура будівлі
  indoorTemperature() {
    const purpose = purposes.find((option) => option.purpose === this.purpose);

    return purpose.indoorTemperature;
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

  // Енергопотреба
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

  // Тепловтрати
  totalHeatLosses(month) {
    return (
      this.transmissionHeatLosses(month) + this.ventilationHeatLosses(month)
    );
  }

  // Тепловтрати трансмісією
  transmissionHeatLosses(month) {
    return (
      this.overallTransmissionHeatTransferCoefficient() *
      (this.indoorTemperature() - this.outdoorTemperature(month)) *
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
      (this.indoorTemperature() - this.outdoorTemperature(month)) *
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
        (sum, facade) => sum + facade.adjustedAirflow(this.constructionType),
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
    return (
      month.hours *
      this.facades.reduce(
        (sum, facade) =>
          sum +
          facade.windows.reduce(
            (sum, window) => sum + window.solarHeatGains(this.city, month),
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
    return this.totalHeatGains(month) / this.totalHeatLosses(month);
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
}
