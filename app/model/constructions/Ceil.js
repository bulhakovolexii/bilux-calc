import Construction from "./Constructions";

export default class Ceil extends Construction {
  constructor(inputData) {
    super(inputData);
    this.type = inputData.type;
  }

  static h_si = 10;

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
      R_sum += layer.R();
    });
    return 1 / Ceil.h_si + R_sum + 1 / this.h_se();
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
  H_X() {
    return this.b_U() * this.area * this.U_i();
  }
}
