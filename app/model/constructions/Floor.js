import Construction from "./Construction";

export default class Floor extends Construction {
  constructor(inputData) {
    super(inputData);
    this.type = inputData.type;
  }
  static h_si = 5.9;
  static h_se = 17;

  R_sum() {
    let R_sum = 0;
    this.layers.forEach((layer) => {
      R_sum += layer.R();
    });
    if (this.type === "Перекриття над неопалюваним підвалом") {
      return 1 / Floor.h_se + R_sum + 1 / Floor.h_si;
    } else {
      return R_sum;
    }
  }

  b_U() {
    return 0.3;
  }

  H_X() {
    if (this.type === "Підлога на ґругті") {
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
      return this.b_U() * this.area * this.U_i();
    }
  }
}
