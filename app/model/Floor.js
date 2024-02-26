import Facade from "./Facade";

export default class Floor {
  constructor(inputData) {
    this.area = inputData.area;
    this.quantity = inputData.quantity;
    this.height = inputData.height;
    this.facades = inputData.facades.map((facade) => new Facade(facade));
  }

  totalArea() {
    return this.area * this.quantity;
  }
}
