import Vector3D from "./Vector3D";

/**
 * @class Point3D
 */
export default class Point3D {
  constructor(
    public x: number = 0,
    public y: number = 0,
    public z: number = 0
  ) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  clone(): Point3D {
    return new Point3D(this.x, this.y, this.z);
  }

  d_squared(p: Point3D): number {
    return (
      (this.x - p.x) * (this.x - p.x) +
      (this.y - p.y) * (this.y - p.y) +
      (this.z - p.z) * (this.z - p.z)
    );
  }

  distance(p: Point3D): number {
    return Math.sqrt(this.d_squared(p));
  }

  product(otherVector: Point3D): Point3D {
    this.x *= otherVector.x;
    this.y *= otherVector.y;
    this.z *= otherVector.z;
    return this;
  }

  multiply(scalarValue: number): Point3D {
    this.x *= scalarValue;
    this.y *= scalarValue;
    this.z *= scalarValue;
    return this;
  }

  add(otherVector: Point3D): Point3D {
    this.x += otherVector.x;
    this.y += otherVector.y;
    this.z += otherVector.z;
    return this;
  }

  addVector(v: Vector3D): Point3D {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
  }

  subtract(otherVector: Point3D): Point3D {
    this.x -= otherVector.x;
    this.y -= otherVector.y;
    this.z -= otherVector.z;
    return this;
  }

  revert(): Point3D {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this;
  }

  asVector3D(): Vector3D {
    return new Vector3D(this.x, this.y, this.z);
  }
}
