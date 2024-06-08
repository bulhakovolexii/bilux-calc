import citiesClimateData from "./reference-data/citiesClimateData";
import purposes from "./reference-data/purposes";

export default class Building {
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
    this.buildingWidth = parseFloat(inputData.buildingLength); // Ширина будівлі
    this.buildingLength = parseFloat(inputData.buildingLength); // Довжина будівлі
    this.floorHeight = parseFloat(inputData.floorHeight); // Висота поверху
    this.numberOfFloors = parseInt(inputData.numberOfFloors); // Кількість поверхів
  }

  // Загальна висота будівлі
  calculateTotalHeight() {
    return this.floorHeight * this.numberOfFloors;
  }

  // Кондиціонована площа будівлі
  calculateConditionedArea() {
    return this.width * this.length * this.numberOfFloors;
  }

  // Кондиціонований обʼєм будівлі
  calculateConditionedVolume() {
    return this.width * this.length * this.calculateTotalHeight();
  }

  // Кліматичні дані для обраного міста
  getClimateData() {
    const climateData = citiesClimateData.find(
      (climateData) => climateData.city === this.city
    );
    return climateData;
  }

  // Середньомісячна температура навколишнього середовища
  getEnvironmentalTemperature(month) {
    const climateData = this.getClimateData();
    const monthlyTemperatures = climateData.monthlyTemperatures;
    const monthIndex = monthlyDurationIntervals.indexOf(month);
    if (monthIndex !== -1 && monthIndex < monthlyTemperatures.length) {
      return monthlyTemperatures[monthIndex];
    }
  }

  // Внутрішня температура будівлі
  getIndoorTemperature() {
    const purpose = purposes.find((purpose) => purpose.type === this.purpose);
    return purpose.indoorTemperature;
  }
}
