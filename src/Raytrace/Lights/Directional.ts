import Light from "./Light";
import RGBColor from "../Math/RGBColor";
import Vector3D from "../Math/Vector3D";
import ShadeRec from "../Math/ShadeRec";
import World from "../World/World";
import Ray from "../Math/Ray";

export default class Directional extends Light {
  ls: number;
  color: RGBColor;
  dir: Vector3D;
  constructor() {
    super();
    this.dir = new Vector3D(0, -1, 0);
    this.color = new RGBColor(1, 1, 1);
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
    return this.dir.clone();
  }
  in_shadow(w: World, shadowRay: Ray): boolean {
    if (!this.casts_shadow) return false;
    let t: number;
    for (let j = 0; j < w.objects.length; j++) {
      let t = w.objects[j].shadow_hit(shadowRay);
      if (t > 0) return true;
    }
    return false;
  }
}
