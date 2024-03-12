export default class System {
  constructor(inputData) {
    this.Q_nd = inputData.Q_nd;
  }

  Q_use() {
    return this.Q_nd;
  }
}
