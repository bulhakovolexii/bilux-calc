import Layer from "./Layer";

export default class Ceiling {
  static INTERNAL_HEAT_EMISSION_COEFFICIENT = 10;

  constructor(inputData) {
    // Nested data
    this.width = inputData.width;
    this.height = inputData.height;
    // Entered data
    this.type = inputData.type;
    this.layers = inputData.layers.map((layer) => new Layer(layer));
  }

  area() {
    return this.width * this.height;
  }

  heatTransferCoefficient() {
    return (
      this.temperatureDifferenceCorrectionCoefficient() *
      this.area() *
      this.uFactor()
    );
  }

  temperatureDifferenceCorrectionCoefficient() {
    switch (this.type) {
      case "Cуміщене покриття" || "Холодне горище односімейних будівель":
        return 1;
      case "Технічне (тепле) горище":
        return 0.7;
      case "Холодне горище багатоповерхових будівель":
        return 0.9;
    }
  }

  uFactor() {
    return 1 / this.thermalResistance();
  }

  thermalResistance() {
    let thermalResistance = 0;
    this.layers.forEach((layer) => {
      thermalResistance += layer.thermalResistance();
    });
    return (
      1 / Ceiling.INTERNAL_HEAT_EMISSION_COEFFICIENT +
      thermalResistance +
      1 / this.externalHeatEmissionCoefficient()
    );
  }

  externalHeatEmissionCoefficient() {
    if (this.type === "Cуміщене покриття") {
      return 23;
    } else {
      return 6;
    }
  }
}
