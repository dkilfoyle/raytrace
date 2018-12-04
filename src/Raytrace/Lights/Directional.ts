import Light from "./Light";
import RGBColor from "../Math/RGBColor";
import Vector3D from "../Math/Vector3D";
import ShadeRec from "../Math/ShadeRec";

export default class Directional extends Light {
  ls: number;
  color: RGBColor;
  dir: Vector3D;
  constructor() {
    super();
    this.dir = new Vector3D(0, -1, 0);
    this.color = new RGBColor(0, 0, 0);
    this.ls = 0;
  }
  set_direction(d: Vector3D): void {
    this.dir = d;
    this.dir.normalize();
  }
  scale_radiance(b: number): void {
    this.ls = b;
  }
  L(s: ShadeRec) {
    return this.color.clone().multiply(this.ls);
  }
  get_direction(sr: ShadeRec): Vector3D {
    return this.dir;
  }
}
