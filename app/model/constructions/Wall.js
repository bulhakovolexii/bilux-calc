import environmentTypes from "../reference-data/environmentTypes";
import Window from "./Window";
import Door from "./Door";
import citiesClimateData from "../reference-data/citiesClimateData";
import windSpeedCoefficients from "../reference-data/windSpeedCoefficients";
import Layer from "./Layer";

export default class Wall {
  static h_si = 8.7;

  constructor(inputData) {
    this.width = inputData.width;
    this.height = inputData.height;
    this.buildingHeight = inputData.buildingHeight;
    this.layers = inputData.layers.map((layer) => new Layer(layer));
    this.direction = inputData.direction;
    this.enviroment = inputData.enviroment;
    this.city = inputData.city;
    this.indoorTemperature = inputData.indoorTemperature;
    this.buildingPurpose = inputData.buildingPurpose;
    this.buildingHeight = inputData.buildingHeight;
    this.terrain = inputData.terrain;
    this.airPermeabilityClass = inputData.airPermeabilityClass;
    this.includes =
      inputData.includes?.map(
        (include) =>
          new Wall({
            ...include,
            direction: this.direction,
            city: this.city,
            indoorTemperature: this.indoorTemperature,
            buildingPurpose: this.buildingPurpose,
            terrain: this.terrain,
            airPermeabilityClass: this.airPermeabilityClass,
          })
      ) || [];
    this.windows =
      inputData.windows?.map(
        (window) =>
          new Window({
            ...window,
            direction: this.direction,
            enviroment: this.enviroment,
          })
      ) || [];
    this.doors =
      inputData.doors?.map(
        (door) => new Door({ ...door, enviroment: this.enviroment })
      ) || [];
  }

  //  TEMPORARY METHODS
  totalArea() {
    return this.width * this.height;
  }
  U_op() {
    return 1 / this.R_sum();
  }
  U_i() {
    return this.U_op();
  }
  //  TEMPORARY METHODS

  area() {
    const includesArea = this.includes.reduce(
      (sum, obj) => sum + obj.totalArea(),
      0
    );
    const windowsArea = this.windows.reduce(
      (sum, obj) => sum + obj.totalArea(),
      0
    );
    const doorsArea = this.doors.reduce((sum, obj) => sum + obj.totalArea(), 0);
    const totalIndludesArea = includesArea + windowsArea + doorsArea;
    if (this.totalArea() >= totalIndludesArea) {
      return this.totalArea() - totalIndludesArea;
    } else {
      throw new Error("Площа включень перевищує площу стіни");
    }
  }

  h_se() {
    return this.enviroment !== undefined ? 12 : 23;
  }

  R_sum() {
    let R_sum = 0;
    this.layers.forEach((layer) => {
      R_sum += layer.thermalResistance();
    });
    return 1 / Wall.h_si + R_sum + 1 / this.h_se();
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
      ? environmentTypes.find(
          (environment) => environment.type === this.enviroment
        ).b_U
      : 1;
  }

  heatTransferCoefficient() {
    const includesH_X =
      this.includes.reduce(
        (sum, obj) => sum + obj.heatTransferCoefficient(),
        0
      ) +
      this.windows.reduce((sum, obj) => sum + obj.H_X(), 0) +
      this.doors.reduce((sum, obj) => sum + obj.H_X(), 0);

    return this.b_U() * this.area() * this.U_i() + includesH_X;
  }

  adjustedAirflow(typeAndCondition) {
    let a_inf_m;
    switch (typeAndCondition) {
      case "Неутеплені, залізобетонні панелі або кладка з крупноблокових елементів з міжпанельними стиками в незадовільному стані":
        a_inf_m = 1.3;
        break;
      case "Неутеплені, кладка з дрібноштучних виробів у незадовільному стані":
        a_inf_m = 1.2;
        break;
      case "Утеплені мінераловатними матеріалами в задовільному стані":
        a_inf_m = 1.1;
        break;
      case "Утеплені органічними матеріалами в задовільному стані":
        a_inf_m = 1.05;
        break;
      default:
        a_inf_m = 1;
        break;
    }
    let expression =
      this.deltaP_gr_mn() + this.f_e_seas_m() * this.deltaP_wd_m();
    if (expression < 0) {
      expression = -expression;
    }
    return this.Q_100_s_m() * ((a_inf_m * expression) / 100) ** (2 / 3);
  }

  f_e_seas_m() {
    return citiesClimateData.find((city) => this.city === city.city)
      .windDirectionRepeatability[this.direction];
  }
  deltaP_gr_mn() {
    return (
      0.5 * this.buildingHeight * (this.lambda_e_seas() - this.lambda_int_set())
    );
  }
  deltaP_wd_m() {
    return 0.03 * this.lambda_e_seas() * this.beta_v() * this.V_e_seas_m() ** 2;
  }

  V_e_seas_m() {
    return citiesClimateData.find((citie) => citie.city === this.city)
      .januaryWindSpeed[this.direction];
  }

  beta_v() {
    return windSpeedCoefficients.find(
      (height) =>
        this.buildingHeight > height.lower &&
        this.buildingHeight <= height.upper
    )[this.terrain];
  }

  lambda_e_seas() {
    return 3463 / (273 + this.phi_e_seas());
  }
  lambda_int_set() {
    return 3463 / (273 + this.indoorTemperature);
  }
  phi_e_seas() {
    if (
      this.buildingPurpose === "Будівлі навчальних закладів" ||
      this.buildingPurpose === "Будівлі дитячих навчальних закладів" ||
      this.buildingPurpose === "Будівлі закладів охорони здоровʼя"
    ) {
      return citiesClimateData.find((citie) => citie.city === this.city)
        .averageTemperatureBelow10;
    } else {
      return citiesClimateData.find((citie) => citie.city === this.city)
        .averageTemperatureBelow8;
    }
  }

  Q_100_s_m() {
    let airPermeabilityClass;
    switch (this.airPermeabilityClass) {
      case "Продувна":
        airPermeabilityClass = 50;
        break;
      case "Не герметична":
        airPermeabilityClass = 27;
        break;
      case "Слабо герметична":
        airPermeabilityClass = 9;
        break;
      case "Герметична":
        airPermeabilityClass = 3;
        break;
    }
    const this_Q_100 = this.windows.reduce((sum, window) => {
      return sum + airPermeabilityClass * window.totalArea();
    }, 0);
    let includes_Q_100 = 0;
    this.includes.forEach((include) => {
      if (!include.enviroment) {
        includes_Q_100 += include.windows.reduce(
          (sum, window) => sum + airPermeabilityClass * window.totalArea(),
          0
        );
      }
    });
    return this_Q_100 + includes_Q_100;
  }
}
