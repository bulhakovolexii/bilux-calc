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
    if (this.type === "Підлога на ґрунті") {
      this.area() * this.groundFloorUFActor();
    } else if (this.type === "Опалюваний підвал (цокольний поверх)") {
      this.area() * this.heatedBasementUFActor() +
        this.wallHeight * this.perimeter() * this.wallUFactor();
    } else {
      return (
        Floor.TEMPERATURE_DIFFERENCE_CORRECTION_COEFFICIENT *
        this.area() *
        this.uFactor()
      );
    }
  }

  groundFloorUFActor() {
    if (this.floorEquivalentThickness() < this.floorCharacteristicDimension()) {
      // Formula 9
    } else {
      // Formula 10
    }
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
    const expression = this.floorEquivalentThickness() + 0.5 * this.wallHeight;

    if (expression < this.floorCharacteristicDimension()) {
      // Formula 14
    } else {
      // Formula 15
    }
  }

  wallUFactor() {
    // Formula 16
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
