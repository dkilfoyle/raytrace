/**
 * @class Point2D
 */
export default class Point2D {
  constructor(public x: number = 0, public y: number = 0) {
    this.x = x;
    this.y = y;
  }

  get_coord(coord: string): number {
    if (coord === "x") return this.x;
    if (coord === "y") return this.y;
    console.log("error get_coord is not x or y");
    return 0;
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
