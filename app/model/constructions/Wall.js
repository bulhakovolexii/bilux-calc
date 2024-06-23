import Window from "./Window";
import Door from "./Door";
import Layer from "./Layer";
import environmentTypes from "../reference-data/environmentTypes";
import windSpeedCoefficients from "../reference-data/windSpeedCoefficients";
import airPermeabilityClasses from "../reference-data/airPermeabilityClasses";

export default class Wall {
  static h_si = 8.7;

  constructor(inputData) {
    this.width = inputData.width;
    this.height = inputData.height;
    this.buildingHeight = inputData.buildingHeight;
    this.layers = inputData.layers.map((layer) => new Layer(layer));
    this.direction = inputData.direction;
    this.environment = inputData.environment;
    this.climateData = inputData.climateData;
    this.indoorTemperature = inputData.indoorTemperature;
    this.buildingPurpose = inputData.buildingPurpose;
    this.terrain = inputData.terrain;
    this.airPermeabilityClass = inputData.airPermeabilityClass;
    this.inclusions =
      inputData.inclusions?.map(
        (inclusion) =>
          new Wall({
            ...inclusion,
            direction: this.direction,
            climateData: this.climateData,
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
            environment: this.environment,
          })
      ) || [];
    this.doors =
      inputData.doors?.map(
        (door) => new Door({ ...door, environment: this.environment })
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
    const inclusionsArea = this.inclusions.reduce(
      (sum, obj) => sum + obj.totalArea(),
      0
    );
    const windowsArea = this.windows.reduce(
      (sum, obj) => sum + obj.totalArea(),
      0
    );
    const doorsArea = this.doors.reduce((sum, obj) => sum + obj.totalArea(), 0);
    const totalInclusionsArea = inclusionsArea + windowsArea + doorsArea;
    if (this.totalArea() >= totalInclusionsArea) {
      return this.totalArea() - totalInclusionsArea;
    } else {
      throw new Error("Площа включень перевищує площу стіни");
    }
  }

  h_se() {
    return this.environment !== undefined ? 12 : 23;
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
    return this.environment
      ? environmentTypes.find(
          (environment) => environment.type === this.environment
        ).b_U
      : 1;
  }

  heatTransferCoefficient() {
    const inclusionsH_X =
      this.inclusions.reduce(
        (sum, obj) => sum + obj.heatTransferCoefficient(),
        0
      ) +
      this.windows.reduce((sum, obj) => sum + obj.H_X(this.b_U()), 0) +
      this.doors.reduce((sum, obj) => sum + obj.H_X(this.b_U()), 0);

    return this.b_U() * this.area() * this.U_i() + inclusionsH_X;
  }

  adjustedAirflow(a_inf_m) {
    let expression =
      this.deltaP_gr_mn() + this.f_e_seas_m() * this.deltaP_wd_m();
    if (expression < 0) {
      expression = -expression;
    }
    return this.Q_100_s_m() * ((a_inf_m * expression) / 100) ** (2 / 3);
  }

  f_e_seas_m() {
    return this.climateData.windDirectionRepeatability[this.direction];
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
    return this.climateData.januaryWindSpeed[this.direction];
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
      return this.climateData.averageTemperatureBelow10;
    } else {
      return this.climateData.averageTemperatureBelow8;
    }
  }

  Q_100_s_m() {
    const airPermeability = airPermeabilityClasses.find(
      (option) => option.airPermeabilityClass === this.airPermeabilityClass
    ).airPermeability;

    const this_Q_100 = this.windows.reduce((sum, window) => {
      return sum + airPermeability * window.totalArea();
    }, 0);

    let inclusions_Q_100 = 0;

    this.inclusions.forEach((inclusion) => {
      if (!inclusion.environment) {
        inclusions_Q_100 += inclusion.windows.reduce(
          (sum, window) => sum + airPermeability * window.totalArea(),
          0
        );
      }
    });
    return this_Q_100 + inclusions_Q_100;
  }
}
