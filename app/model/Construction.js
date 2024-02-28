export class Construction {}

export class Floor extends Construction {}
export class Ceil extends Construction {}
export class Facade extends Construction {
  constructor({ direction, area }) {
    super();
    this.area = area;
    this.direction = direction;
  }
}
