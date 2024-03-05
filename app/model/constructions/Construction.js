import Layer from "./Layer";

export default class Construction {
  constructor(inputData) {
    this.width = inputData.width;
    this.height = inputData.height;
    this.layers = inputData.layers.map((layer) => new Layer(layer));
    this.buildingHeight = inputData.buildingHeight;
  }

  totalArea() {
    return this.width * this.height;
  }

  U_op() {
    return 1 / this.R_sum();
  }

  U_i() {
    return this.U_op();
  }
}
