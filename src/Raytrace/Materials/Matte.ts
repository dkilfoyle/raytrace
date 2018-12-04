import RGBColor from "../Math/RGBColor";
import ShadeRec from "../Math/ShadeRec";
import Vector3D from "../Math/Vector3D";
import Material from "./Material";
import World from "../World/World";
import Lambertian from "../BRDFs/Lambertian";

export default class Matte extends Material {
  ambient_brdf: Lambertian;
  diffuse_brdf: Lambertian;
  constructor() {
    super();
    this.ambient_brdf = new Lambertian();
    this.diffuse_brdf = new Lambertian();
  }
  shade(w: World, sr: ShadeRec): RGBColor {
    const wo: Vector3D = sr.intersection.ray.d.clone().reverse();
    const L: RGBColor = this.ambient_brdf.rho(sr, wo).product(w.ambient.L(sr));

    for (let j = 0; j < w.lights.length; j++) {
      let wi: Vector3D = w.lights[j].get_direction(sr);
      let ndotwi: number = sr.intersection.normal.dotProduct(wi);

      if (ndotwi > 0.0) {
        L.add(
          this.diffuse_brdf
            .f(sr, wo, wi)
            .product(w.lights[j].L(sr))
            .multiply(ndotwi)
        );
      }
    }
    return L;
  }
}
