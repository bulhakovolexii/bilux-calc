import cities from "../reference-data/cities";
import enviromentTypes from "../reference-data/enviroment-types";
import months from "../reference-data/months";
import windows from "../reference-data/windows";

export default class Window {
  constructor(inputData) {
    this.enviroment = inputData.enviroment;
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
    return this.enviroment
      ? enviromentTypes.find(
          (enviroment) => enviroment.type === this.enviroment
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

  Phi_sol_k(cityName, month) {
    let dir;
    switch (this.direction) {
      case "Пн":
        dir = 0;
        break;
      case "Сх":
        dir = 1;
        break;
      case "Пд":
        dir = 2;
        break;
      case "Зх":
        dir = 3;
        break;
    }

    return (
      this.A_sol() *
      cities.find((city) => city.name === cityName).weather.solarRadiation[
        months.indexOf(month)
      ][dir]
    );
  }
}
