import Point3D from "./Point3D";
import Vector3D from "./Vector3D";

export default class Ray {
  /**
   * 3D ray
   * @param o origin
   * @param d direction
   */
  o: Point3D;
  d: Vector3D;
  constructor(o: Point3D = new Point3D(), d: Vector3D = new Vector3D()) {
    this.o = o.clone();
    this.d = d.clone();
  }
  clone(): Ray {
    let c: Ray = new Ray(this.o, this.d);
    return c;
  }
}
