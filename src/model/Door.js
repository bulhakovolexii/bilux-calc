import doors from "./reference-data/doors";

export default class Door {
  constructor(inputData) {
    // Nested data
    this.environment = inputData.environment;
    // Entered data
    this.width = inputData.width;
    this.height = inputData.height;
    this.quantity = inputData.quantity;
    this.variant = inputData.variant;
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
    return doors.find((door) => door.variant === this.variant)
      .thermalResistance;
  }
}
