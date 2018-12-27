import RGBColor from "../Math/RGBColor";
import ShadeRec from "../Math/ShadeRec";
import Vector3D from "../Math/Vector3D";
import Material from "./Material";
import World from "../World/World";
import Lambertian from "../BRDFs/Lambertian";
import Ray from "../Math/Ray";

export default class Matte extends Material {
  ambient_brdf: Lambertian;
  diffuse_brdf: Lambertian;
  constructor() {
    super();
    this.ambient_brdf = new Lambertian();
    this.diffuse_brdf = new Lambertian();
  }
  set_cd(c: RGBColor): void {
    this.ambient_brdf.cd = c.clone();
    this.diffuse_brdf.cd = c.clone();
  }
  shade(w: World, sr: ShadeRec): RGBColor {
    if (window.bDebug) console.group("Material Matte.shade: ", sr);
    const wo: Vector3D = sr.intersection.ray.d.clone().reverse();
    const L: RGBColor = this.ambient_brdf
      .rho(sr, wo)
      .product(w.ambient.L(w, sr));

    for (let j = 0; j < w.lights.length; j++) {
      let wi: Vector3D = w.lights[j].get_direction(sr);
      let ndotwi: number = sr.intersection.normal.dotProduct(wi);

      if (ndotwi > 0.0) {
        let in_shadow: boolean = false;

        if (w.lights[j].casts_shadow) {
          let shadowRay: Ray = new Ray(sr.intersection.hit_point, wi);
          in_shadow = w.lights[j].in_shadow(w, shadowRay);
        }

        if (!in_shadow) {
          if (window.bDebug)
            console.log("Visible light: ", j, ", ndotwi: ", ndotwi);
          L.add(
            this.diffuse_brdf
              .f(sr, wo, wi)
              .product(w.lights[j].L(w, sr))
              .multiply(ndotwi)
          );
        } else {
          if (window.bDebug) console.log("Shadow Blocked light: ", w.lights[j]);
        }
      }
    }

    if (window.bDebug) console.groupEnd();
    return L;
  }
}
