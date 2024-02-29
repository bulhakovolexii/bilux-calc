import materials from "./metials";

export class Construction {
  constructor(inputData) {
    this.area = inputData.area;
    this.layers = inputData.layers.map((layer) => new Layer(layer));
  }
  U_op() {
    return 1 / this.R_sum();
  }
  U_i() {
    return this.U_op();
  }
}

class Layer {
  constructor(inputData) {
    this.thickness = inputData.thickness;
    this.type = inputData.type;
    this.subtype = inputData.subtype;
    this.name = inputData.name;
    this.density = inputData.density;
    this.conductivity = materials
      .find((material) => {
        return (
          material.type === this.type &&
          material.subtype === this.subtype &&
          material.name === this.name
        );
      })
      .variants.find(
        (variant) => variant.density === this.density
      ).conductivity;
  }
  R() {
    return this.thickness / this.conductivity;
  }
}

export class Floor extends Construction {
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

  H_X() {
    if (this.type === "Підлога на ґругті") {
      // розрахунок підлоги на ґрунті
    } else if (this.type === "Опалюваний підвал (цокольний поверх)") {
      // розрахунок цоколя
    } else {
      return 0.3 * this.area * this.U_i();
    }
  }
}

export class Ceil extends Construction {
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

export class Wall extends Construction {
  static h_si = 8.7;
  static h_se = 23;

  R_sum() {
    let R_sum = 0;
    this.layers.forEach((layer) => {
      R_sum += layer.R();
    });
    return 1 / Wall.h_si + R_sum + 1 / Wall.h_se;
  }

  U_i() {
    if (this.U_op() >= 0.8) {
      return this.U_op();
    } else if (this.U_op() < 0.8 && this.U_op() >= 0.4) {
      return this.U_op() + 0.05;
    } else {
      return this.U_op() + 0.1;
    }
  }
}
