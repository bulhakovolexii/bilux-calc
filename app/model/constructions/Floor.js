import Layer from "./Layer";

export default class Floor {
  static INTERNAL_HEAT_EMISSION_COEFFICIENT = 5.9;
  static EXTERNAL_HEAT_EMISSION_COEFFICIENT = 17;
  static TEMPERATURE_DIFFERENCE_CORRECTION_COEFFICIENT = 0.3;

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
    if (this.type === "Підлога на ґрунті") {
      /**
       *
       *
       * розрахунок підлоги на ґрунті
       *
       *
       */
    } else if (this.type === "Опалюваний підвал (цокольний поверх)") {
      /**
       *
       *
       * розрахунок цоколя
       *
       *
       */
    } else {
      return (
        Floor.TEMPERATURE_DIFFERENCE_CORRECTION_COEFFICIENT *
        this.area() *
        this.uFactor()
      );
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
}
