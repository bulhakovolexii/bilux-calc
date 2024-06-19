import Layer from "./Layer";

export default class Floor {
  static h_si = 5.9;
  static h_se = 17;

  constructor(inputData) {
    this.width = inputData.width;
    this.height = inputData.height;
    this.layers = inputData.layers.map((layer) => new Layer(layer));
    this.type = inputData.type;
  }

  //  TEMPORARY METHODS
  area() {
    return this.width * this.height;
  }
  U_op() {
    return 1 / this.R_sum();
  }
  U_i() {
    return this.U_op();
  }
  //  TEMPORARY METHODS

  R_sum() {
    let R_sum = 0;
    this.layers.forEach((layer) => {
      R_sum += layer.thermalResistance();
    });
    if (this.type === "Технічне підпілля") {
      return 1 / Floor.h_se + R_sum + 1 / Floor.h_si;
    } else {
      return R_sum;
    }
  }

  b_U() {
    return 0.3;
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
      return this.b_U() * this.area() * this.U_i();
    }
  }
}
