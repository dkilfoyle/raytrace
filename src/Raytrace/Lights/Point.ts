import Light from "./Light";
import RGBColor from "../Math/RGBColor";
import Vector3D from "../Math/Vector3D";
import ShadeRec from "../Math/ShadeRec";
import Ray from "../Math/Ray";
import World from "../World/World";

export default class Point extends Light {
  ls: number;
  color: RGBColor;
  location: Vector3D;
  constructor(p: Vector3D = new Vector3D(0, 10, 0)) {
    super();
    this.location = p;
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
      .subtract(sr.intersection.hit_point)
      .normalize();
  }
  in_shadow(w: World, shadowRay: Ray): boolean {
    if (!this.casts_shadow) return false;
    let d = this.location.distance(shadowRay.o);
    for (let j = 0; j < w.objects.length; j++) {
      let t = w.objects[j].shadow_hit(shadowRay);
      if (window.bDebug) {
        console.log(
          "PointLight.in_shadow test ",
          w.objects[j].name,
          ", t = ",
          t,
          " d= ",
          d
        );
        console.log("  from shadow.o: ", shadowRay.o);
        console.log("  to light.location: ", this.location);
      }
      if (t > 0 && t < d) return true;
    }
    return false;
  }
}
