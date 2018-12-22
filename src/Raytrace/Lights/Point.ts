import Light from "./Light";
import RGBColor from "../Math/RGBColor";
import Vector3D from "../Math/Vector3D";
import ShadeRec from "../Math/ShadeRec";

export default class Point extends Light {
  ls: number;
  color: RGBColor;
  location: Vector3D;
  constructor() {
    super();
    this.location = new Vector3D(0, 10, 0);
    this.color = new RGBColor(1, 1, 1);
    this.ls = 0;
  }
  scale_radiance(b: number): void {
    this.ls = b;
  }
  L(s: ShadeRec) {
    return this.color.clone().multiply(this.ls);
  }
  get_direction(sr: ShadeRec): Vector3D {
    return this.location
      .clone()
      .subtract(sr.intersection.hit_point.asVector3D())
      .normalize();
  }
}
