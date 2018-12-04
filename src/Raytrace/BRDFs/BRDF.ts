import ShadeRec from "../Math/ShadeRec";
import Vector3D from "../Math/Vector3D";
import RGBColor from "../Math/RGBColor";

export default abstract class BRDF {
  constructor() {}
  abstract f(sr: ShadeRec, wo: Vector3D, wi: Vector3D): RGBColor;
  abstract rho(sr: ShadeRec, wo: Vector3D): RGBColor;
}
