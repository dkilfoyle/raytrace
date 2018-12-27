import Light from "./Light";
import RGBColor from "../Math/RGBColor";
import Vector3D from "../Math/Vector3D";
import ShadeRec from "../Math/ShadeRec";
import Ray from "../Math/Ray";
import World from "../World/World";
import Sampler from "../Samplers/Sampler";
import MultiJittered from "../Samplers/MultiJittered";
import Point3D from "../Math/Point3D";

export default class AmbientOccluder extends Light {
  ls: number;
  color: RGBColor;
  sampler: Sampler;
  u!: Vector3D;
  v!: Vector3D;
  w!: Vector3D;
  min_amount: number;
  constructor(sampler: Sampler = new MultiJittered(256)) {
    super();
    this.sampler = sampler;
    this.sampler.map_samples_to_hemisphere(1); // e=1 cosine distribution
    this.color = new RGBColor(1.0, 1.0, 1.0);
    this.ls = 1.0;
    this.min_amount = 0.0;
  }
  scale_radiance(b: number): void {
    this.ls = b;
  }
  get_direction(sr: ShadeRec): Vector3D {
    let sp: Point3D = this.sampler.sample_hemisphere();
    return this.u
      .clone()
      .multiply(sp.x)
      .add(this.v.clone().multiply(sp.y))
      .add(this.w.clone().multiply(sp.z));
  }
  in_shadow(w: World, shadowRay: Ray): boolean {
    let t: number;
    for (let j = 0; j < w.objects.length; j++) {
      let t = w.objects[j].shadow_hit(shadowRay);
      if (t > 0) return true;
    }
    return false;
  }
  L(w: World, sr: ShadeRec) {
    this.w = sr.intersection.normal.clone();
    this.v = this.w.crossProduct(new Vector3D(0.0072, 1.0, 0.0034));
    this.v.normalize();
    this.u = this.v.crossProduct(this.w);

    let ray: Ray = new Ray(sr.intersection.hit_point, this.get_direction(sr));
    if (this.in_shadow(w, ray))
      return this.color.clone().multiply(this.ls * this.min_amount);
    else return this.color.clone().multiply(this.ls);
  }
}
