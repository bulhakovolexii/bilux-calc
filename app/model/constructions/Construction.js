import Layer from "./Layer";

export default class Construction {
  constructor(inputData) {
    this.area = inputData.area;
    this.layers = inputData.layers.map((layer) => new Layer(layer));
  }
  U_op() {
    return 1 / this.R_sum();
  }
  U_i() {
    return this.U_op();
  }
}
