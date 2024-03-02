import Construction from "./Constructions";
import enviromentTypes from "../reference-data/enviroment-types";

export default class Wall extends Construction {
  constructor(inputData) {
    super(inputData);
    this.direction = inputData.direction;
    this.enviroment = inputData.enviroment;
    this.includes =
      inputData.includes?.map(
        (include) => new Wall({ ...include, direction: this.direction })
      ) || [];
    this.windows =
      inputData.windows?.map(
        (window) => new Window({ ...window, direction: this.direction })
      ) || [];
    this.doors = inputData.doors?.map((door) => new Door(door)) || [];
  }
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

  b_U() {
    return this.enviroment
      ? enviromentTypes.find(
          (enviroment) => enviroment.type === this.enviroment
        ).b_U
      : 1;
  }
}
