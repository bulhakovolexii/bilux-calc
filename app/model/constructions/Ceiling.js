import Layer from "./Layer";

export default class Ceiling {
  static h_si = 10;

  constructor(inputData) {
    // Nested data
    this.width = inputData.width;
    this.height = inputData.height;
    // Entered data
    this.type = inputData.type;
    this.layers = inputData.layers.map((layer) => new Layer(layer));
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

  h_se() {
    if (this.type === "Cуміщене покриття") {
      return 23;
    } else {
      return 6;
    }
  }

  R_sum() {
    let R_sum = 0;
    this.layers.forEach((layer) => {
      R_sum += layer.thermalResistance();
    });
    return 1 / Ceiling.h_si + R_sum + 1 / this.h_se();
  }

  b_U() {
    switch (this.type) {
      case "Cуміщене покриття" || "Холодне горище односімейних будівель":
        return 1;
      case "Технічне (тепле) горище":
        return 0.7;
      case "Холодне горище багатоповерхових будівель":
        return 0.9;
    }
  }

  heatTransferCoefficient() {
    return this.b_U() * this.area() * this.U_i();
  }
}
