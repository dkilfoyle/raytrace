import BRDF from "./BRDF";
import ShadeRec from "../Math/ShadeRec";
import Vector3D from "../Math/Vector3D";
import RGBColor from "../Math/RGBColor";

export default class Lambertian extends BRDF {
  invPI: number = 1 / Math.PI;

  constructor(public kd: number = 0.0, public cd: RGBColor = new RGBColor()) {
    super();
  }
  f(sr: ShadeRec, wo: Vector3D, wi: Vector3D): RGBColor {
    return this.cd
      .clone()
      .multiply(this.kd)
      .multiply(this.invPI);
  }
  rho(sr: ShadeRec, wo: Vector3D): RGBColor {
    return this.cd.clone().multiply(this.kd);
  }
}
