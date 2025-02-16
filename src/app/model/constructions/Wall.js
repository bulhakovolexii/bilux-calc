import Window from "./Window";
import Door from "./Door";
import Layer from "./Layer";
import environmentTypes from "../reference-data/environmentTypes";
import windSpeedCoefficients from "../reference-data/windSpeedCoefficients";
import airPermeabilityClasses from "../reference-data/airPermeabilityClasses";

export default class Wall {
  static INTERNAL_HEAT_EMISSION_COEFFICIENT = 8.7;

  constructor(inputData) {
    this.width = inputData.width;
    this.height = inputData.height;
    this.buildingHeight = inputData.buildingHeight;
    this.layers = inputData.layers.map((layer) => new Layer(layer));
    this.direction = inputData.direction;
    this.environment = inputData.environment;
    this.climateData = inputData.climateData;
    this.indoorTemperature = inputData.indoorTemperature;
    this.buildingPurpose = inputData.buildingPurpose;
    this.terrain = inputData.terrain;
    this.airPermeabilityClass = inputData.airPermeabilityClass;
    this.inclusions =
      inputData.inclusions?.map(
        (inclusion) =>
          new Wall({
            ...inclusion,
            direction: this.direction,
            climateData: this.climateData,
            indoorTemperature: this.indoorTemperature,
            buildingPurpose: this.buildingPurpose,
            terrain: this.terrain,
            airPermeabilityClass: this.airPermeabilityClass,
          })
      ) || [];
    this.windows =
      inputData.windows?.map(
        (window) =>
          new Window({
            ...window,
            direction: this.direction,
            environment: this.environment,
          })
      ) || [];
    this.doors =
      inputData.doors?.map(
        (door) =>
          new Door({
            ...door,
            environment: this.environment,
          })
      ) || [];
  }

  area() {
    const inclusionsArea = this.inclusions.reduce(
      (sum, obj) => sum + obj.totalArea(),
      0
    );
    const windowsArea = this.windows.reduce(
      (sum, obj) => sum + obj.totalArea(),
      0
    );
    const doorsArea = this.doors.reduce((sum, obj) => sum + obj.totalArea(), 0);
    const totalInclusionsArea = inclusionsArea + windowsArea + doorsArea;
    if (this.totalArea() >= totalInclusionsArea) {
      return this.totalArea() - totalInclusionsArea;
    } else {
      throw new Error("Площа включень перевищує площу стіни");
    }
  }

  totalArea() {
    return this.width * this.height;
  }

  // Тепловтрати трансмісією
  heatTransferCoefficient() {
    const inclusionsHeatTransferCoefficient =
      this.inclusions.reduce(
        (sum, obj) => sum + obj.heatTransferCoefficient(),
        0
      ) +
      this.windows.reduce(
        (sum, obj) =>
          sum +
          obj.heatTransferCoefficient(
            this.temperatureDifferenceCorrectionCoefficient()
          ),
        0
      ) +
      this.doors.reduce(
        (sum, obj) =>
          sum +
          obj.heatTransferCoefficient(
            this.temperatureDifferenceCorrectionCoefficient()
          ),
        0
      );
    return (
      this.temperatureDifferenceCorrectionCoefficient() *
        this.area() *
        this.uFactor() +
      inclusionsHeatTransferCoefficient
    );
  }

  temperatureDifferenceCorrectionCoefficient() {
    return this.environment
      ? environmentTypes.find(
          (environment) => environment.type === this.environment
        ).temperatureDifferenceCorrectionCoefficient
      : 1;
  }

  uFactor() {
    const opaqueUFactor = 1 / this.thermalResistance();

    if (opaqueUFactor >= 0.8) {
      return opaqueUFactor;
    } else if (opaqueUFactor < 0.8 && opaqueUFactor >= 0.4) {
      return opaqueUFactor + 0.05;
    } else {
      return opaqueUFactor + 0.1;
    }
  }

  externalHeatEmissionCoefficient() {
    return this.environment !== undefined ? 12 : 23;
  }

  thermalResistance() {
    let thermalResistance = 0;
    this.layers.forEach((layer) => {
      thermalResistance += layer.thermalResistance();
    });
    return (
      1 / Wall.INTERNAL_HEAT_EMISSION_COEFFICIENT +
      thermalResistance +
      1 / this.externalHeatEmissionCoefficient()
    );
  }

  // Тепловтрати вентиляцією
  adjustedAirflow(airLeakageAdjustmentFactor) {
    let expression =
      this.gravitationalPressureDifference() +
      this.windDirectionRepeatability() * this.windPressureDifference();
    if (expression < 0) {
      expression = -expression;
    }
    return (
      this.facadeOpeningsAirPermeability() *
      ((airLeakageAdjustmentFactor * expression) / 100) ** (2 / 3)
    );
  }

  gravitationalPressureDifference() {
    return (
      0.5 *
      this.buildingHeight *
      (this.externalAirSpecificWeight() - this.internalAirSpecificWeight())
    );
  }

  windDirectionRepeatability() {
    return this.climateData.windDirectionRepeatability[this.direction];
  }

  windPressureDifference() {
    return (
      0.03 *
      this.externalAirSpecificWeight() *
      this.airSpeedVariationWithHeightCoefficient() *
      this.januaryWindSpeed() ** 2
    );
  }

  januaryWindSpeed() {
    return this.climateData.januaryWindSpeed[this.direction];
  }

  airSpeedVariationWithHeightCoefficient() {
    return windSpeedCoefficients.find(
      (height) =>
        this.buildingHeight > height.lower &&
        this.buildingHeight <= height.upper
    )[this.terrain];
  }

  externalAirSpecificWeight() {
    return 3463 / (273 + this.averageExternalTemperature());
  }

  internalAirSpecificWeight() {
    return 3463 / (273 + this.indoorTemperature);
  }

  averageExternalTemperature() {
    if (
      this.buildingPurpose === "Будівлі навчальних закладів" ||
      this.buildingPurpose === "Будівлі дитячих навчальних закладів" ||
      this.buildingPurpose === "Будівлі закладів охорони здоровʼя"
    ) {
      return this.climateData.averageTemperatureBelow10;
    } else {
      return this.climateData.averageTemperatureBelow8;
    }
  }

  facadeOpeningsAirPermeability() {
    const airPermeabilityCoefficient = airPermeabilityClasses.find(
      (option) => option.airPermeabilityClass === this.airPermeabilityClass
    ).airPermeability;

    const airPermeability = this.windows.reduce((sum, window) => {
      return sum + airPermeabilityCoefficient * window.totalArea();
    }, 0);

    let inclusionsAirPermeability = 0;

    this.inclusions.forEach((inclusion) => {
      if (!inclusion.environment) {
        inclusionsAirPermeability += inclusion.windows.reduce(
          (sum, window) =>
            sum + airPermeabilityCoefficient * window.totalArea(),
          0
        );
      }
    });
    return airPermeability + inclusionsAirPermeability;
  }
}
