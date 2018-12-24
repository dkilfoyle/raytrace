import ShadeRec from "../Math/ShadeRec";
import Vector3D from "../Math/Vector3D";
import RGBColor from "../Math/RGBColor";
import Ray from "../Math/Ray";
import World from "../World/World";

export default abstract class Light {
  casts_shadow: boolean = true;
  constructor() {}
  abstract in_shadow(w: World, shadowRay: Ray): boolean;
  abstract get_direction(sr: ShadeRec): Vector3D;
  abstract L(sr: ShadeRec): RGBColor;
}
