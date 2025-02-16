import windows from "./reference-data/windows";

export default class Window {
  static FRAME_AREA_FRACTION = 0.3;
  static NON_DIFFUSING_GLAZING_CORRECTION_COEFFICIENT = 0.9;
  constructor(inputData) {
    // Nested data
    this.environment = inputData.environment;
    this.direction = inputData.direction;
    // Entered data
    this.width = inputData.width;
    this.height = inputData.height;
    this.quantity = inputData.quantity;
    this.variant = inputData.type.variant;
    this.air = inputData.type.air;
    this.krypton = inputData.type.krypton;
    this.argon = inputData.type.argon;
  }

  area() {
    return this.width * this.height;
  }

  totalArea() {
    return this.area() * this.quantity;
  }

  // Тепловтрати
  heatTransferCoefficient(temperatureDifferenceCorrectionCoefficient) {
    return (
      temperatureDifferenceCorrectionCoefficient *
      this.totalArea() *
      this.uFactor()
    );
  }

  uFactor() {
    return 1 / this.thermalResistance();
  }

  thermalResistance() {
    return windows.find(
      (window) =>
        window.variant === this.variant &&
        window.air === this.air &&
        window.krypton === this.krypton &&
        window.argon === this.argon
    ).thermalResistance;
  }

  // Теплонадходження
  solarHeatGains(solarRadiation) {
    return (
      this.equivalentSolarInsolationArea() * solarRadiation[this.direction]
    );
  }

  equivalentSolarInsolationArea() {
    return (
      this.solarEnergyTransmittanceCoefficient() *
      (1 - Window.FRAME_AREA_FRACTION) *
      this.totalArea()
    );
  }

  solarEnergyTransmittanceCoefficient() {
    return (
      Window.NON_DIFFUSING_GLAZING_CORRECTION_COEFFICIENT *
      windows.find(
        (window) =>
          window.variant === this.variant &&
          window.air === this.air &&
          window.krypton === this.krypton &&
          window.argon === this.argon
      ).solarEnergyTransmittanceCoefficient
    );
  }
}
