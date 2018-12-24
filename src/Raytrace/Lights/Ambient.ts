import Light from "./Light";
import RGBColor from "../Math/RGBColor";
import Vector3D from "../Math/Vector3D";
import ShadeRec from "../Math/ShadeRec";
import Ray from "../Math/Ray";
import World from "../World/World";

export default class Ambient extends Light {
  ls: number;
  color: RGBColor;
  constructor() {
    super();
    this.color = new RGBColor(1.0, 1.0, 1.0);
    this.ls = 1.0;
  }
  scale_radiance(b: number): void {
    this.ls = b;
  }
  L(s: ShadeRec) {
    return this.color.clone().multiply(this.ls);
  }
  get_direction(sr: ShadeRec): Vector3D {
    return new Vector3D(0, 0, 0);
  }
  in_shadow(w: World, shadowRay: Ray): boolean {
    throw new Error("Method not implemented.");
  }
}
