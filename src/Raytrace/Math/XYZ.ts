export default class XYZ {
  x: number;
  y: number;
  z: number;

  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  toString(): string {
    return (
      this.x.toPrecision(4) +
      "," +
      this.y.toPrecision(4) +
      "," +
      this.z.toPrecision(4)
    );
  }

  length2(): number {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  length(): number {
    return Math.sqrt(this.length2());
  }

  d_squared(p: XYZ): number {
    return (
      (this.x - p.x) * (this.x - p.x) +
      (this.y - p.y) * (this.y - p.y) +
      (this.z - p.z) * (this.z - p.z)
    );
  }

  distance(p: XYZ): number {
    return Math.sqrt(this.d_squared(p));
  }
}
