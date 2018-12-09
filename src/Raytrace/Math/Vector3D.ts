/**
 * @class Vector3D
 */
export default class Vector3D {
  constructor(
    public x: number = 0,
    public y: number = 0,
    public z: number = 0
  ) {
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

  clone(): Vector3D {
    return new Vector3D(this.x, this.y, this.z);
  }

  length2(): number {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  length(): number {
    return Math.sqrt(this.length2());
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

  multiplyVector(otherVector: Vector3D): Vector3D {
    this.x *= otherVector.x;
    this.y *= otherVector.y;
    this.z *= otherVector.z;
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

  add(otherVector: Vector3D): Vector3D {
    this.x += otherVector.x;
    this.y += otherVector.y;
    this.z += otherVector.z;
    return this;
  }

  subtract(otherVector: Vector3D): Vector3D {
    this.x -= otherVector.x;
    this.y -= otherVector.y;
    this.z -= otherVector.z;
    return this;
  }

  reverse(): Vector3D {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this;
  }
}
