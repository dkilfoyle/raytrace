import BRDF from "./BRDF";
import ShadeRec from "../Math/ShadeRec";
import Vector3D from "../Math/Vector3D";
import RGBColor from "../Math/RGBColor";
import Sampler from "../Samplers/Sampler";

export default class GlossySpecular extends BRDF {
  ks: number;
  cs: RGBColor;
  exp: number;
  sampler!: Sampler;
  constructor() {
    super();
    this.ks = 0.2;
    this.cs = new RGBColor(1, 1, 1);
    this.exp = 20;
  }
  f(sr: ShadeRec, wo: Vector3D, wi: Vector3D): RGBColor {
    let L: RGBColor;
    let ndotwi: number = sr.intersection.normal.dotProduct(wi);
    let r: Vector3D = wi
      .clone()
      .reverse()
      .add(sr.intersection.normal.clone().multiplyScalar(2.0 * ndotwi));
    let rdotwo = r.dotProduct(wo);

    if (rdotwo > 0.0) {
      L = this.cs.clone().multiply(this.ks * Math.pow(rdotwo, this.exp));
    } else {
      L = new RGBColor(0, 0, 0);
    }
    if (window.bDebug) {
      console.group("GlossSpecularBRDF: ", this);
      console.log("f = ", L);
      console.log("rdotwo = ", rdotwo);
      console.groupEnd();
    }
    return L;
  }
  rho(sr: ShadeRec, wo: Vector3D): RGBColor {
    return new RGBColor(0, 0, 0);
  }
}
