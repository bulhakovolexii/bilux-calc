import citiesClimateData from "../reference-data/citiesClimateData";
import environmentTypes from "../reference-data/environmentTypes";
import monthlyDurationIntervals from "../reference-data/monthlyDurationIntervals";
import windows from "../reference-data/windows";

export default class Window {
  constructor(inputData) {
    this.environment = inputData.environment;
    this.direction = inputData.direction;
    this.width = inputData.width;
    this.height = inputData.height;
    this.quantity = inputData.quantity;
    this.variant = inputData.variant;
    this.air = inputData.air;
    this.krypton = inputData.krypton;
    this.argon = inputData.argon;
  }

  area() {
    return this.width * this.height;
  }

  totalArea() {
    return this.area() * this.quantity;
  }

  R_sum() {
    return windows.find(
      (window) =>
        window.variant === this.variant &&
        window.air === this.air &&
        window.krypton === this.krypton &&
        window.argon === this.argon
    ).R_sum;
  }

  U_op() {
    return 1 / this.R_sum();
  }

  U_i() {
    return this.U_op();
  }

  b_U() {
    return this.environment
      ? environmentTypes.find(
          (environment) => environment.type === this.environment
        ).b_U
      : 1;
  }

  H_X() {
    return this.b_U() * this.totalArea() * this.U_i();
  }

  A_sol() {
    return this.g_n() * (1 - 0.3) * this.totalArea();
  }

  g_n() {
    return (
      0.9 *
      windows.find(
        (window) =>
          window.variant === this.variant &&
          window.air === this.air &&
          window.krypton === this.krypton &&
          window.argon === this.argon
      ).g_n
    );
  }

  solarHeatGains(cityName, month) {
    const climateData = citiesClimateData.find((data) => data.city === cityName)
      .solarRadiation[monthlyDurationIntervals.indexOf(month)];

    return this.A_sol() * climateData[this.direction];
  }
}
