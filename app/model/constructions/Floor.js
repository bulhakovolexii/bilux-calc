import Layer from "./Layer";

export default class Floor {
  static INTERNAL_HEAT_EMISSION_COEFFICIENT = 5.9;
  static EXTERNAL_HEAT_EMISSION_COEFFICIENT = 17;
  static TEMPERATURE_DIFFERENCE_CORRECTION_COEFFICIENT = 0.3;
  static SOIL_THERMAL_CONDUCTIVITY = 2;
  static EXTERNAL_THERMAL_RESISTANCE = 0.043;
  static INTERNAL_VERTICAL_THERMAL_RESISTANCE = 0.115;
  static INTERNAL_HORIZONTAL_THERMAL_RESISTANCE = 0.17;

  constructor(inputData) {
    // Nested data
    this.width = inputData.width;
    this.height = inputData.height;
    this.wallTotalThickness = inputData.wallTotalThickness;
    // Entered data
    this.type = inputData.type;
    this.layers = inputData.layers.map((layer) => new Layer(layer));
    this.wallHeight = inputData.wallHeight;
    this.wallLayers =
      inputData.wallLayers?.map((layer) => new Layer(layer)) || [];
  }

  area() {
    return this.width * this.height;
  }

  perimeter() {
    return (this.width + this.height) * 2;
  }

  heatTransferCoefficient() {
    switch (this.type) {
      case "Підлога на ґрунті":
        return this.area() * this.groundFloorUFActor();

      case "Опалюваний підвал (цокольний поверх)":
        return (
          this.area() * this.heatedBasementUFActor() +
          this.wallHeight * this.perimeter() * this.wallUFactor()
        );

      default:
        return (
          Floor.TEMPERATURE_DIFFERENCE_CORRECTION_COEFFICIENT *
          this.area() *
          this.uFactor()
        );
    }
  }

  groundFloorUFActor() {
    const isIsolationBad =
      this.floorEquivalentThickness() < this.floorCharacteristicDimension();
    let groundFloorUFActor = 0;
    if (isIsolationBad) {
      groundFloorUFActor =
        ((2 * Floor.SOIL_THERMAL_CONDUCTIVITY) /
          (Math.PI * this.floorCharacteristicDimension() +
            this.floorEquivalentThickness())) *
        Math.log(
          (Math.PI * this.floorCharacteristicDimension()) /
            this.floorEquivalentThickness +
            1
        );
    } else {
      groundFloorUFActor =
        Floor.SOIL_THERMAL_CONDUCTIVITY /
        (0.475 * this.floorCharacteristicDimension() +
          this.floorEquivalentThickness());
    }
    return groundFloorUFActor;
  }

  floorCharacteristicDimension() {
    return this.area() / (0.5 * this.perimeter());
  }

  floorEquivalentThickness() {
    return (
      this.wallTotalThickness +
      Floor.SOIL_THERMAL_CONDUCTIVITY *
        (Floor.INTERNAL_HORIZONTAL_THERMAL_RESISTANCE +
          this.thermalResistance() +
          Floor.EXTERNAL_THERMAL_RESISTANCE)
    );
  }

  wallEquivalentThickness() {
    return (
      Floor.SOIL_THERMAL_CONDUCTIVITY *
      (Floor.INTERNAL_VERTICAL_THERMAL_RESISTANCE +
        this.wallThermalResistance() +
        Floor.EXTERNAL_THERMAL_RESISTANCE)
    );
  }

  heatedBasementUFActor() {
    const isIsolationBad =
      this.floorEquivalentThickness() + 0.5 * this.wallHeight <
      this.floorCharacteristicDimension();
    let heatedBasementUFActor = 0;

    if (isIsolationBad) {
      heatedBasementUFActor =
        ((2 * Floor.SOIL_THERMAL_CONDUCTIVITY) /
          (Math.PI * this.floorCharacteristicDimension() +
            this.floorEquivalentThickness() +
            0.5 * this.wallHeight)) *
        Math.log(
          (Math.PI * this.floorCharacteristicDimension()) /
            (this.floorEquivalentThickness() + 0.5 * this.wallHeight) +
            1
        );
    } else {
      heatedBasementUFActor =
        (2 * Floor.SOIL_THERMAL_CONDUCTIVITY) /
        (0.475 * this.floorCharacteristicDimension() +
          this.floorEquivalentThickness() +
          0.5 * this.wallHeight);
    }
    return heatedBasementUFActor;
  }

  wallUFactor() {
    let wallUFactor = 0;

    const pi = Math.PI;
    const numerator = 2 * Floor.SOIL_THERMAL_CONDUCTIVITY;
    const denominator = pi * this.wallHeight;
    const term =
      1 +
      (0.5 * this.floorEquivalentThickness()) /
        (this.floorEquivalentThickness() + this.wallHeight);
    const logArgument = this.wallHeight / this.wallEquivalentThickness + 1;

    wallUFactor = (numerator / denominator) * term * Math.log(logArgument);

    return wallUFactor;
  }

  uFactor() {
    return 1 / this.thermalResistance();
  }

  thermalResistance() {
    const thermalResistance = this.layers.reduce(
      (sum, layer) => sum + layer.thermalResistance(),
      0
    );
    if (this.type === "Технічне підпілля") {
      return (
        1 / Floor.EXTERNAL_HEAT_EMISSION_COEFFICIENT +
        thermalResistance +
        1 / Floor.INTERNAL_HEAT_EMISSION_COEFFICIENT
      );
    } else {
      return thermalResistance;
    }
  }

  wallThermalResistance() {
    return this.wallLayers.reduce(
      (sum, layer) => sum + layer.thermalResistance(),
      0
    );
  }
}
