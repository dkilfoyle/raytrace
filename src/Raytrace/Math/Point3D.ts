import Vector3D from "./Vector3D";
import XYZ from "./XYZ";

/**
 * @class Point3D
 */
export default class Point3D extends XYZ {
  constructor(
    public x: number = 0,
    public y: number = 0,
    public z: number = 0
  ) {
    super(x, y, z);
  }

  clone(): Point3D {
    return new Point3D(this.x, this.y, this.z);
  }

  cloneVector(): Vector3D {
    return new Vector3D(this.x, this.y, this.z);
  }

  product(otherVector: XYZ): Point3D {
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

  add(otherVector: XYZ): Point3D {
    this.x += otherVector.x;
    this.y += otherVector.y;
    this.z += otherVector.z;
    return this;
  }

  subtract(otherVector: XYZ): Point3D {
    this.x -= otherVector.x;
    this.y -= otherVector.y;
    this.z -= otherVector.z;
    return this;
  }

  multiplyScalar(scalarValue: number): Point3D {
    this.x *= scalarValue;
    this.y *= scalarValue;
    this.z *= scalarValue;
    return this;
  }

  divideScalar(scalarValue: number): Point3D {
    return this.multiplyScalar(1 / scalarValue);
  }

  negate(): Point3D {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this;
  }
}
