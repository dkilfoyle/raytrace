/**
 * @class Point2D
 */
export default class Point2D {
  constructor(public x: number = 0, public y: number = 0) {
    this.x = x;
    this.y = y;
  }

  clone(): Point2D {
    return new Point2D(this.x, this.y);
  }

  multiply(scalarValue: number): Point2D {
    this.x *= scalarValue;
    this.y *= scalarValue;
    return this;
  }
}
