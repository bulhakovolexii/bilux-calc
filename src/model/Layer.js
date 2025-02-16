export default class Layer {
  constructor(inputData) {
    this.thickness = parseInt(inputData.thickness) / 1000;
    this.conductivity = inputData.material.conductivity;
  }
  thermalResistance() {
    return this.thickness / this.conductivity;
  }
}
