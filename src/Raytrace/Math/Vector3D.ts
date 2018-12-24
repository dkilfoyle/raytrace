import Point3D from "./Point3D";
import XYZ from "./XYZ";

/**
 * @class Vector3D
 */
export default class Vector3D extends XYZ {
  constructor(
    public x: number = 0,
    public y: number = 0,
    public z: number = 0
  ) {
    super(x, y, z);
  }

  clone(): Vector3D {
    return new Vector3D(this.x, this.y, this.z);
  }

  product(otherVector: XYZ): Vector3D {
    this.x *= otherVector.x;
    this.y *= otherVector.y;
    this.z *= otherVector.z;
    return this;
  }

  multiply(scalarValue: number): Vector3D {
    this.x *= scalarValue;
    this.y *= scalarValue;
    this.z *= scalarValue;
    return this;
  }

  add(otherVector: XYZ): Vector3D {
    this.x += otherVector.x;
    this.y += otherVector.y;
    this.z += otherVector.z;
    return this;
  }

  subtract(otherVector: XYZ): Vector3D {
    this.x -= otherVector.x;
    this.y -= otherVector.y;
    this.z -= otherVector.z;
    return this;
  }

  multiplyScalar(scalarValue: number): Vector3D {
    this.x *= scalarValue;
    this.y *= scalarValue;
    this.z *= scalarValue;
    return this;
  }

  divideScalar(scalarValue: number): Vector3D {
    return this.multiplyScalar(1 / scalarValue);
  }

  normalize(): Vector3D {
    var len2 = this.length2();
    if (len2 > 0) {
      var invLen = 1 / Math.sqrt(len2);
      this.x *= invLen;
      this.y *= invLen;
      this.z *= invLen;
    }

    return this;
  }

  dotProduct(otherVector: Vector3D): number {
    return (
      this.x * otherVector.x + this.y * otherVector.y + this.z * otherVector.z
    );
  }

  crossProduct(v: Vector3D): Vector3D {
    return new Vector3D(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    );
  }

  reverse(): Vector3D {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this;
  }
}
