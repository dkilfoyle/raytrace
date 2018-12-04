import ShadeRec from "../Math/ShadeRec";
import Vector3D from "../Math/Vector3D";
import RGBColor from "../Math/RGBColor";

export default abstract class Light {
  constructor() {}
  abstract get_direction(sr: ShadeRec): Vector3D;
  abstract L(sr: ShadeRec): RGBColor;
}
