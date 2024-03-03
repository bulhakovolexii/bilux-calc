import windows from "../reference-data/windows";

export default class Window {
  constructor(inputData) {
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
}
